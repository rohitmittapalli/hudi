/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi

import org.apache.avro.Schema
import org.apache.avro.generic.GenericRecord
import org.apache.hadoop.fs.{FileSystem, Path}
import org.apache.hudi.client.utils.SparkRowSerDe
import org.apache.hudi.common.model.HoodieRecord
import org.apache.spark.SPARK_VERSION
import org.apache.spark.rdd.RDD
import org.apache.spark.sql.avro.SchemaConverters
import org.apache.spark.sql.catalyst.encoders.RowEncoder
import org.apache.spark.sql.catalyst.expressions.{AttributeReference, Expression, Literal}
import org.apache.spark.sql.execution.datasources.{FileStatusCache, InMemoryFileIndex}
import org.apache.spark.sql.sources._
import org.apache.spark.sql.types.{StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, SparkSession}

import scala.collection.JavaConverters.asScalaBufferConverter

object HoodieSparkUtils extends SparkAdapterSupport {

  def isSpark3: Boolean = SPARK_VERSION.startsWith("3.")

  def getMetaSchema: StructType = {
    StructType(HoodieRecord.HOODIE_META_COLUMNS.asScala.map(col => {
      StructField(col, StringType, nullable = true)
    }))
  }

  /**
   * This method copied from [[org.apache.spark.deploy.SparkHadoopUtil]].
   * [[org.apache.spark.deploy.SparkHadoopUtil]] becomes private since Spark 3.0.0 and hence we had to copy it locally.
   */
  def isGlobPath(pattern: Path): Boolean = {
    pattern.toString.exists("{}[]*?\\".toSet.contains)
  }

  /**
   * This method copied from [[org.apache.spark.deploy.SparkHadoopUtil]].
   * [[org.apache.spark.deploy.SparkHadoopUtil]] becomes private since Spark 3.0.0 and hence we had to copy it locally.
   */
  def globPath(fs: FileSystem, pattern: Path): Seq[Path] = {
    Option(fs.globStatus(pattern)).map { statuses =>
      statuses.map(_.getPath.makeQualified(fs.getUri, fs.getWorkingDirectory)).toSeq
    }.getOrElse(Seq.empty[Path])
  }

  /**
   * This method copied from [[org.apache.spark.deploy.SparkHadoopUtil]].
   * [[org.apache.spark.deploy.SparkHadoopUtil]] becomes private since Spark 3.0.0 and hence we had to copy it locally.
   */
  def globPathIfNecessary(fs: FileSystem, pattern: Path): Seq[Path] = {
    if (isGlobPath(pattern)) globPath(fs, pattern) else Seq(pattern)
  }

  /**
   * Checks to see whether input path contains a glob pattern and if yes, maps it to a list of absolute paths
   * which match the glob pattern. Otherwise, returns original path
   *
   * @param paths List of absolute or globbed paths
   * @param fs    File system
   * @return list of absolute file paths
   */
  def checkAndGlobPathIfNecessary(paths: Seq[String], fs: FileSystem): Seq[Path] = {
    paths.flatMap(path => {
      val qualified = new Path(path).makeQualified(fs.getUri, fs.getWorkingDirectory)
      val globPaths = globPathIfNecessary(fs, qualified)
      globPaths
    })
  }

  def createInMemoryFileIndex(sparkSession: SparkSession, globbedPaths: Seq[Path]): InMemoryFileIndex = {
    val fileStatusCache = FileStatusCache.getOrCreate(sparkSession)
    new InMemoryFileIndex(sparkSession, globbedPaths, Map(), Option.empty, fileStatusCache)
  }

  def createRdd(df: DataFrame, structName: String, recordNamespace: String, upgradeToLatestSchemaIfNeeded: Boolean): RDD[GenericRecord] = {
    createRdd(df, null, structName, recordNamespace, upgradeToLatestSchemaIfNeeded)
  }

  def createRdd(df: DataFrame, latestSchema: Schema, structName: String, recordNamespace: String, upgradeToLatestSchemaIfNeeded: Boolean): RDD[GenericRecord] = {
    val avroSchema = AvroConversionUtils.convertStructTypeToAvroSchema(df.schema, structName, recordNamespace)
    // if upgradeToLatestSchemaIfNeeded is set to true and latestSchema is not null, then try to leverage latestSchema
    // this code path will handle situations where records are serialized in schema1, but callers wish to convert to
    // Rdd[GenericRecord] using different schema(could be evolved schema or could be latest table schema)
    if (upgradeToLatestSchemaIfNeeded && latestSchema != null) {
      createRdd(df, avroSchema, latestSchema, structName, recordNamespace)
    } else {
      // there are paths where callers wish to use latestSchema to convert to Rdd[GenericRecords] and not use row's schema
      // So use latestSchema is not null. if not available, fallback to using row's schema.
      createRdd(df, if(latestSchema != null) latestSchema else avroSchema, null, structName, recordNamespace)
    }
  }

  def createRdd(df: DataFrame, avroSchema: Schema, latestSchema: Schema, structName: String, recordNamespace: String)
  : RDD[GenericRecord] = {
    // Use the Avro schema to derive the StructType which has the correct nullability information
    val dataType = SchemaConverters.toSqlType(avroSchema).dataType.asInstanceOf[StructType]
    val encoder = RowEncoder.apply(dataType).resolveAndBind()
    val deserializer = sparkAdapter.createSparkRowSerDe(encoder)
    // if records were serialized with old schema, but an evolved schema was passed in with latestSchema, we need
    // latestSchema equivalent datatype to be passed in to AvroConversionHelper.createConverterToAvro()
    val latestDataType =
      if (latestSchema != null) SchemaConverters.toSqlType(latestSchema).dataType.asInstanceOf[StructType] else null
    // Note: deserializer.deserializeRow(row) is not capable of handling evolved schema. i.e. if Row was serialized in
    // old schema, but deserializer was created with an encoder with evolved schema, deserialization fails.
    // Hence we always need to deserialize in the same schema as serialized schema.
    df.queryExecution.toRdd.map(row => deserializer.deserializeRow(row))
      .mapPartitions { records =>
        if (records.isEmpty) Iterator.empty
        else {
          // if records were serialized with old schema, but an evolved schema was passed in with latestSchema, we need
          // latestSchema equivalent datatype to be passed in to AvroConversionHelper.createConverterToAvro()
          val convertor = AvroConversionHelper.createConverterToAvro(
            if (latestDataType != null) latestDataType else dataType, structName, recordNamespace)
          records.map { x => convertor(x).asInstanceOf[GenericRecord] }
        }
      }
  }

  def getDeserializer(structType: StructType) : SparkRowSerDe = {
    val encoder = RowEncoder.apply(structType).resolveAndBind()
    sparkAdapter.createSparkRowSerDe(encoder)
  }

  /**
   * Convert Filters to Catalyst Expressions and joined by And. If convert success return an
   * Non-Empty Option[Expression],or else return None.
   */
  def convertToCatalystExpressions(filters: Array[Filter],
                                   tableSchema: StructType): Option[Expression] = {
    val expressions = filters.map(convertToCatalystExpression(_, tableSchema))
    if (expressions.forall(p => p.isDefined)) {
      if (expressions.isEmpty) {
        None
      } else if (expressions.length == 1) {
        expressions(0)
      } else {
        Some(expressions.map(_.get).reduce(org.apache.spark.sql.catalyst.expressions.And))
      }
    } else {
      None
    }
  }

  /**
   * Convert Filter to Catalyst Expression. If convert success return an Non-Empty
   * Option[Expression],or else return None.
   */
  def convertToCatalystExpression(filter: Filter, tableSchema: StructType): Option[Expression] = {
    Option(
      filter match {
        case EqualTo(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.EqualTo(toAttribute(attribute, tableSchema), Literal.create(value))
        case EqualNullSafe(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.EqualNullSafe(toAttribute(attribute, tableSchema), Literal.create(value))
        case GreaterThan(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.GreaterThan(toAttribute(attribute, tableSchema), Literal.create(value))
        case GreaterThanOrEqual(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.GreaterThanOrEqual(toAttribute(attribute, tableSchema), Literal.create(value))
        case LessThan(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.LessThan(toAttribute(attribute, tableSchema), Literal.create(value))
        case LessThanOrEqual(attribute, value) =>
          org.apache.spark.sql.catalyst.expressions.LessThanOrEqual(toAttribute(attribute, tableSchema), Literal.create(value))
        case In(attribute, values) =>
          val attrExp = toAttribute(attribute, tableSchema)
          val valuesExp = values.map(v => Literal.create(v))
          org.apache.spark.sql.catalyst.expressions.In(attrExp, valuesExp)
        case IsNull(attribute) =>
          org.apache.spark.sql.catalyst.expressions.IsNull(toAttribute(attribute, tableSchema))
        case IsNotNull(attribute) =>
          org.apache.spark.sql.catalyst.expressions.IsNotNull(toAttribute(attribute, tableSchema))
        case And(left, right) =>
          val leftExp = convertToCatalystExpression(left, tableSchema)
          val rightExp = convertToCatalystExpression(right, tableSchema)
          if (leftExp.isEmpty || rightExp.isEmpty) {
            null
          } else {
            org.apache.spark.sql.catalyst.expressions.And(leftExp.get, rightExp.get)
          }
        case Or(left, right) =>
          val leftExp = convertToCatalystExpression(left, tableSchema)
          val rightExp = convertToCatalystExpression(right, tableSchema)
          if (leftExp.isEmpty || rightExp.isEmpty) {
            null
          } else {
            org.apache.spark.sql.catalyst.expressions.Or(leftExp.get, rightExp.get)
          }
        case Not(child) =>
          val childExp = convertToCatalystExpression(child, tableSchema)
          if (childExp.isEmpty) {
            null
          } else {
            org.apache.spark.sql.catalyst.expressions.Not(childExp.get)
          }
        case StringStartsWith(attribute, value) =>
          val leftExp = toAttribute(attribute, tableSchema)
          val rightExp = Literal.create(s"$value%")
          sparkAdapter.createLike(leftExp, rightExp)
        case StringEndsWith(attribute, value) =>
          val leftExp = toAttribute(attribute, tableSchema)
          val rightExp = Literal.create(s"%$value")
          sparkAdapter.createLike(leftExp, rightExp)
        case StringContains(attribute, value) =>
          val leftExp = toAttribute(attribute, tableSchema)
          val rightExp = Literal.create(s"%$value%")
          sparkAdapter.createLike(leftExp, rightExp)
        case _=> null
      }
    )
  }

  private def toAttribute(columnName: String, tableSchema: StructType): AttributeReference = {
    val field = tableSchema.find(p => p.name == columnName)
    assert(field.isDefined, s"Cannot find column: $columnName, Table Columns are: " +
      s"${tableSchema.fieldNames.mkString(",")}")
    AttributeReference(columnName, field.get.dataType, field.get.nullable)()
  }
}
