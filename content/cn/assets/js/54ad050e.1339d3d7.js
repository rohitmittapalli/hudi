"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[12744],{3905:(e,t,i)=>{i.d(t,{Zo:()=>u,kt:()=>m});var n=i(67294);function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function l(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)i=o[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):r(r({},t),e)),i},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var i=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(i),h=a,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||o;return i?n.createElement(m,r(r({ref:t},u),{},{components:i})):n.createElement(m,r({ref:t},u))}));function m(e,t){var i=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=i.length,r=new Array(o);r[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,r[1]=l;for(var c=2;c<o;c++)r[c]=i[c];return n.createElement.apply(null,r)}return n.createElement.apply(null,i)}h.displayName="MDXCreateElement"},81800:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var n=i(87462),a=(i(67294),i(3905));const o={title:"Employing correct configurations for Hudi's cleaner table service",excerpt:"Ensuring isolation between Hudi writers and readers using `HoodieCleaner.java`",author:"pratyakshsharma",category:"blog",image:"/assets/images/blog/hoodie-cleaner/Initial_timeline.png",tags:["how-to","cleaner","apache hudi"]},r=void 0,l={permalink:"/cn/blog/2021/06/10/employing-right-configurations-for-hudi-cleaner",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2021-06-10-employing-right-configurations-for-hudi-cleaner.md",source:"@site/blog/2021-06-10-employing-right-configurations-for-hudi-cleaner.md",title:"Employing correct configurations for Hudi's cleaner table service",description:"Apache Hudi provides snapshot isolation between writers and readers. This is made possible by Hudi\u2019s MVCC concurrency model. In this blog, we will explain how to employ the right configurations to manage multiple file versions. Furthermore, we will discuss mechanisms available to users on how to maintain just the required number of old file versions so that long running readers do not fail.",date:"2021-06-10T00:00:00.000Z",formattedDate:"June 10, 2021",tags:[{label:"how-to",permalink:"/cn/blog/tags/how-to"},{label:"cleaner",permalink:"/cn/blog/tags/cleaner"},{label:"apache hudi",permalink:"/cn/blog/tags/apache-hudi"}],readingTime:6.55,truncated:!0,authors:[{name:"pratyakshsharma"}],prevItem:{title:"Part1: Query apache hudi dataset in an amazon S3 data lake with amazon athena : Read optimized queries",permalink:"/cn/blog/2021/07/16/Query-apache-hudi-dataset-in-an-amazon-S3-data-lake-with-amazon-athena-Read-optimized-queries"},nextItem:{title:"Apache Hudi: How Uber gets data a ride to its destination",permalink:"/cn/blog/2021/06/04/Apache-Hudi-How-Uber-gets-data-a-ride-to-its-destination"}},s={authorsImageUrls:[void 0]},c=[{value:"Reclaiming space and keeping your data lake storage costs in check",id:"reclaiming-space-and-keeping-your-data-lake-storage-costs-in-check",children:[],level:3},{value:"Problem Statement",id:"problem-statement",children:[],level:3},{value:"Deeper dive into Hudi Cleaner",id:"deeper-dive-into-hudi-cleaner",children:[],level:3},{value:"Cleaning Policies",id:"cleaning-policies",children:[],level:3},{value:"Examples",id:"examples",children:[],level:3},{value:"Configurations",id:"configurations",children:[],level:3},{value:"Run command",id:"run-command",children:[],level:3},{value:"Future Scope",id:"future-scope",children:[],level:3}],u={toc:c},d="wrapper";function p(e){let{components:t,...o}=e;return(0,a.kt)(d,(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Apache Hudi provides snapshot isolation between writers and readers. This is made possible by Hudi\u2019s MVCC concurrency model. In this blog, we will explain how to employ the right configurations to manage multiple file versions. Furthermore, we will discuss mechanisms available to users on how to maintain just the required number of old file versions so that long running readers do not fail. "),(0,a.kt)("h3",{id:"reclaiming-space-and-keeping-your-data-lake-storage-costs-in-check"},"Reclaiming space and keeping your data lake storage costs in check"),(0,a.kt)("p",null,"Hudi provides different table management services to be able to manage your tables on the data lake. One of these services is called the ",(0,a.kt)("strong",{parentName:"p"},"Cleaner"),". As you write more data to your table, for every batch of updates received, Hudi can either generate a new version of the data file with updates applied to records (COPY_ON_WRITE) or write these delta updates to a log file, avoiding rewriting newer version of an existing file (MERGE_ON_READ). In such situations, depending on the frequency of your updates, the number of file versions of log files can grow indefinitely. If your use-cases do not require keeping an infinite history of these versions, it is imperative to have a process that reclaims older versions of the data. This is Hudi\u2019s cleaner service."),(0,a.kt)("h3",{id:"problem-statement"},"Problem Statement"),(0,a.kt)("p",null,"In a data lake architecture, it is a very common scenario to have readers and writers concurrently accessing the same table. As the Hudi cleaner service periodically reclaims older file versions, scenarios arise where a long running query might be accessing a file version that is deemed to be reclaimed by the cleaner. Here, we need to employ the correct configs to ensure readers (aka queries) don\u2019t fail."),(0,a.kt)("h3",{id:"deeper-dive-into-hudi-cleaner"},"Deeper dive into Hudi Cleaner"),(0,a.kt)("p",null,"To deal with the mentioned scenario, lets understand the  different cleaning policies that Hudi offers and the corresponding properties that need to be configured. Options are available to schedule cleaning asynchronously or synchronously. Before going into more details, we would like to explain a few underlying concepts:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Hudi base file"),": Columnar file which consists of final data after compaction. A base file\u2019s name follows the following naming convention: ",(0,a.kt)("inlineCode",{parentName:"li"},"<fileId>_<writeToken>_<instantTime>.parquet"),". In subsequent writes of this file, file id remains the same and commit time gets updated to show the latest version. This also implies any particular version of a record, given its partition path, can be uniquely located using the file id and instant time. "),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"File slice"),": A file slice consists of the base file and any log files consisting of the delta, in case of MERGE_ON_READ table type."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Hudi File Group"),": Any file group in Hudi is uniquely identified by the partition path and the  file id that the files in this group have as part of their name. A file group consists of all the file slices in a particular partition path. Also any partition path can have multiple file groups.")),(0,a.kt)("h3",{id:"cleaning-policies"},"Cleaning Policies"),(0,a.kt)("p",null,"Hudi cleaner currently supports below cleaning policies:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"KEEP_LATEST_COMMITS"),": This is the default policy. This is a temporal cleaning policy that ensures the effect of having lookback into all the changes that happened in the last X commits. Suppose a writer is ingesting data  into a Hudi dataset every 30 minutes and the longest running query can take 5 hours to finish, then the user should retain atleast the last 10 commits. With such a configuration, we ensure that the oldest version of a file is kept on disk for at least 5 hours, thereby preventing the longest running query from failing at any point in time. Incremental cleaning is also possible using this policy."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"KEEP_LATEST_FILE_VERSIONS"),": This policy has the effect of keeping N number of file versions irrespective of time. This policy is useful when it is known how many MAX versions of the file does one want to keep at any given time. To achieve the same behaviour as before of preventing long running queries from failing, one should do their calculations based on data patterns. Alternatively, this policy is also useful if a user just wants to maintain 1 latest version of the file.")),(0,a.kt)("h3",{id:"examples"},"Examples"),(0,a.kt)("p",null,"Suppose a user is ingesting data into a hudi dataset of type COPY_ON_WRITE every 30 minutes as shown below:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Initial timeline",src:i(69664).Z}),"\n",(0,a.kt)("em",{parentName:"p"},"Figure1: Incoming records getting ingested into a hudi dataset every 30 minutes")),(0,a.kt)("p",null,"The figure shows a particular partition on DFS where commits and corresponding file versions are color coded. 4 different file groups are created in this partition as depicted by fileGroup1, fileGroup2, fileGroup3 and fileGroup4. File group corresponding to fileGroup2 has records ingested from all the 5 commits, while the group corresponding to fileGroup4 has records from the latest 2 commits only."),(0,a.kt)("p",null,"Suppose the user uses the below configs for cleaning:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.cleaner.policy=KEEP_LATEST_COMMITS\nhoodie.cleaner.commits.retained=2\n")),(0,a.kt)("p",null,"Cleaner selects the versions of files to be cleaned by taking care of the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Latest version of a file should not be cleaned."),(0,a.kt)("li",{parentName:"ul"},"The commit times of the last 2 (configured) + 1 commits are determined. In Figure1, ",(0,a.kt)("inlineCode",{parentName:"li"},"commit 10:30")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"commit 10:00")," correspond to the latest 2 commits in the timeline. One extra commit is included because the time window for retaining commits is essentially equal to the longest query run time. So if the longest query takes 1 hour to finish, and ingestion happens every 30 minutes, you need to retain last 2 commits since 2*30 = 60 (1 hour). At this point of time, the longest query can still be using files written in 3rd commit in reverse order. Essentially this means if a query started executing after ",(0,a.kt)("inlineCode",{parentName:"li"},"commit 9:30"),", it will still be running when clean action is triggered right after ",(0,a.kt)("inlineCode",{parentName:"li"},"commit 10:30")," as in Figure2. "),(0,a.kt)("li",{parentName:"ul"},"Now for any file group, only those file slices are scheduled for cleaning which are not savepointed (another Hudi table service) and whose commit time is less than the 3rd commit (",(0,a.kt)("inlineCode",{parentName:"li"},"commit 9:30")," in figure below) in reverse order.")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Retain latest commits",src:i(63088).Z}),"\n",(0,a.kt)("em",{parentName:"p"},"Figure2: Files corresponding to latest 3 commits are retained")),(0,a.kt)("p",null,"Now, suppose the user uses the below configs for cleaning:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.cleaner.policy=KEEP_LATEST_FILE_VERSIONS\nhoodie.cleaner.fileversions.retained=1\n")),(0,a.kt)("p",null,"Cleaner does the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"For any file group, latest version (including any for pending compaction) of file slices are kept and the rest are scheduled for cleaning. Clearly as shown in Figure3, if clean action is triggered right after ",(0,a.kt)("inlineCode",{parentName:"li"},"commit 10:30"),", the cleaner will simply leave the latest version in every file group and delete the rest.")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Retain latest versions",src:i(48903).Z}),"\n",(0,a.kt)("em",{parentName:"p"},"Figure3: Latest file version in every file group is retained")),(0,a.kt)("h3",{id:"configurations"},"Configurations"),(0,a.kt)("p",null,"You can find the details about all the possible configurations along with the default values ",(0,a.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#compaction-configs"},"here"),"."),(0,a.kt)("h3",{id:"run-command"},"Run command"),(0,a.kt)("p",null,"Hudi's cleaner table service can be run as a separate process or along with your data ingestion. As mentioned earlier, it basically cleans up any stale/old files lying around. In case you want to run it along with ingesting data, configs are available which enable you to run it ",(0,a.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/configurations#withAsyncClean"},"synchronously or asynchronously"),". You can use the below command for running the cleaner independently:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"[hoodie]$ spark-submit --class org.apache.hudi.utilities.HoodieCleaner \\\n  --props s3:///temp/hudi-ingestion-config/kafka-source.properties \\\n  --target-base-path s3:///temp/hudi \\\n  --spark-master yarn-cluster\n")),(0,a.kt)("p",null,"In case you wish to run the cleaner service asynchronously with writing, please configure the below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"hoodie.clean.automatic=true\nhoodie.clean.async=true\n")),(0,a.kt)("p",null,"Further you can use ",(0,a.kt)("a",{parentName:"p",href:"https://hudi.apache.org/docs/deployment#cli"},"Hudi CLI")," for managing your Hudi dataset. CLI provides the below commands for cleaner service:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"cleans show")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"clean showpartitions")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"cleans run"))),(0,a.kt)("p",null,"You can find more details and the relevant code for these commands in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/hudi/blob/master/hudi-cli/src/main/java/org/apache/hudi/cli/commands/CleansCommand.java"},(0,a.kt)("inlineCode",{parentName:"a"},"org.apache.hudi.cli.commands.CleansCommand")," class"),". "),(0,a.kt)("h3",{id:"future-scope"},"Future Scope"),(0,a.kt)("p",null,"Work is currently going on for introducing a new cleaning policy based on time elapsed. This will help in achieving a consistent retention throughout regardless of how frequently ingestion happens. You may track the progress ",(0,a.kt)("a",{parentName:"p",href:"https://issues.apache.org/jira/browse/HUDI-349"},"here"),"."),(0,a.kt)("p",null,"We hope this blog gives you an idea about how to configure the Hudi cleaner and the supported cleaning policies. Please visit the ",(0,a.kt)("a",{parentName:"p",href:"https://hudi.apache.org/blog"},"blog section")," for a deeper understanding of various Hudi concepts. Cheers!"))}p.isMDXComponent=!0},69664:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/Initial_timeline-fd0812aa0c22d797d2192745d103bc41.png"},63088:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/Retain_latest_commits-e387b7c19e4ee4d9cbef7b0bb0466983.png"},48903:(e,t,i)=>{i.d(t,{Z:()=>n});const n=i.p+"assets/images/Retain_latest_versions-723f83313beb86b46c9cd1fcb8ea0b25.png"}}]);