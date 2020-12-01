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

package org.apache.hudi;

import org.apache.spark.sql.Row;

/**
 * Default {@link PreCombineRow} implementation using a single precombine field.
 */
public class DefaultPreCombineRow implements PreCombineRow {

  private final String preCombineField;

  public DefaultPreCombineRow(String preCombineField) {
    if (preCombineField == null || preCombineField.isEmpty()) {
      throw new IllegalArgumentException("PreCombine field has to be set");
    }
    this.preCombineField = preCombineField;
  }

  @Override
  public Row combineTwoRows(Row v1, Row v2) {
    Comparable orderingval1 = (Comparable) v1.getAs(preCombineField);
    Comparable orderingval2 = (Comparable) v2.getAs(preCombineField);
    if (orderingval1.compareTo(orderingval2) >= 0) {
      return v1;
    } else {
      return v2;
    }
  }
}
