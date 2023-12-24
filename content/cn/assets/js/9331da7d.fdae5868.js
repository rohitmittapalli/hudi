"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[74632],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),m=a,d=s["".concat(c,".").concat(m)]||s[m]||g[m]||o;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6746:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(67294),a=n(72389);function o(e){let{children:t,url:o}=e;return(0,a.Z)()&&(n.g.window.location.href=o),r.createElement("span",null,t,"or click ",r.createElement("a",{href:o},"here"))}},45894:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var r=n(87462),a=(n(67294),n(3905)),o=n(6746);const i={title:"Apache Hudi: From Zero To One (5/10)",excerpt:"Introduce table services: compaction, cleaning, and indexing",author:"Shiyan Xu",category:"blog",image:"/assets/images/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.png",tags:["blog","apache hudi","table services","compaction","cleaning","datumagic","indexing"]},l=void 0,c={permalink:"/cn/blog/2023/10/18/Apache-Hudi-From-Zero-To-One-blog-5",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.mdx",source:"@site/blog/2023-10-18-Apache-Hudi-From-Zero-To-One-blog-5.mdx",title:"Apache Hudi: From Zero To One (5/10)",description:"Redirecting... please wait!!",date:"2023-10-18T00:00:00.000Z",formattedDate:"October 18, 2023",tags:[{label:"blog",permalink:"/cn/blog/tags/blog"},{label:"apache hudi",permalink:"/cn/blog/tags/apache-hudi"},{label:"table services",permalink:"/cn/blog/tags/table-services"},{label:"compaction",permalink:"/cn/blog/tags/compaction"},{label:"cleaning",permalink:"/cn/blog/tags/cleaning"},{label:"datumagic",permalink:"/cn/blog/tags/datumagic"},{label:"indexing",permalink:"/cn/blog/tags/indexing"}],readingTime:.045,truncated:!1,authors:[{name:"Shiyan Xu"}],prevItem:{title:"Load data incrementally from transactional data lakes to data warehouses",permalink:"/cn/blog/2023/10/19/load-data-incrementally-from-transactional-data-lakes-to-data-warehouses"},nextItem:{title:"Get started with Apache Hudi using AWS Glue by implementing key design concepts \u2013 Part 1",permalink:"/cn/blog/2023/10/17/Get-started-with-Apache-Hudi-using-AWS-Glue-by-implementing-key-design-concepts-Part-1"}},p={authorsImageUrls:[void 0]},u=[],s={toc:u},g="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(g,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(o.Z,{url:"https://blog.datumagic.com/p/apache-hudi-from-zero-to-one-510",mdxType:"Redirect"},"Redirecting... please wait!! "))}m.isMDXComponent=!0}}]);