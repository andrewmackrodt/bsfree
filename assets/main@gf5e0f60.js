import{I as W,a as C,J as we,K as te,o as be,L as Se,M as V,f as Ee,c as A,d as B,y as L,j as P,t as ke,u as R,C as U,i as Y,q as G,N as b,O as Le,P as xe,e as N,Q as Ae,R as ne,S as Oe,w as ue,F as pe,U as Pe,D as $e,x as je,s as Re,V as Ne,W as Me,X as qe,Y as Ce}from"./vue@VMVV_7_-.js";import{s as Te,a as De,b as q,c as de,d as ze,P as Be}from"./primevue@JRHUw1Xt.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const e of l)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(l){const e={};return l.integrity&&(e.integrity=l.integrity),l.referrerPolicy&&(e.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?e.credentials="include":l.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(l){if(l.ep)return;l.ep=!0;const e=r(l);fetch(l.href,e)}})();const He=""+new URL("logo@DxTsBerY.png",import.meta.url).href;let ee={scrollX:-1,scrollY:-1};const X=[];function Ie(){const t=function(){const o={scrollX:window.scrollX,scrollY:window.scrollY};if(o.scrollX!==ee.scrollX||o.scrollY!==ee.scrollY)for(const r of X)r(o,ee);ee=o,X.length>0&&requestAnimationFrame(t)};requestAnimationFrame(t)}function Ve(t){X.push(t),X.length===1&&Ie()}function Ue(t){const o=X.indexOf(t);o>=0&&X.splice(o,1)}const We=t=>(Le("data-v-151ac467"),t=t(),xe(),t),Fe=We(()=>N("img",{alt:"logo",src:He,class:"h-full"},null,-1)),Ge=W({__name:"Navbar",props:{hideOnScroll:Boolean},setup(t){const o=C(null),r=we(),a=te(),l=t;function e(y){let c=0;return({scrollY:u},{scrollY:p})=>{if(p!==-1){if(u>p){if(c>=y.scrollHeight)return;c=Math.min(y.scrollHeight,c+(u-p))}else{if(c<=0)return;c=Math.max(0,c+(u-p))}y.style.opacity=(1-c*(1/y.scrollHeight)).toString(),y.style.top=`-${c}px`}}}let n=null;be(()=>{l.hideOnScroll&&(n=e(o.value),Ve(n))}),Se(()=>{n&&Ue(n)});function h(y){return y.split(/[_-]/).map(c=>c[0].toUpperCase()+c.slice(1)).join(" ")}const w=V(()=>{const y=a.options.routes.filter(u=>u.meta?.showInNav),c=r.path;return y.map(u=>({label:u.meta?.title||h(u.name),selected:u.path===c,target:u.path}))});return(y,c)=>{const u=Ee("router-link");return A(),B("header",{ref_key:"$el",ref:o,class:"bg-dark sticky py-2",style:{top:"0"}},[L(b(Te),{model:w.value,class:"container-lg h-3rem bg-transparent border-none border-noround"},{start:P(()=>[L(u,{to:"/",class:"hidden lg:block",style:{height:"60px"}},{default:P(()=>[Fe]),_:1})]),item:P(({label:p,item:S,item:{target:D}})=>[D?(A(),Y(u,{key:0,to:D,class:ke(S.selected?"selected":"")},{default:P(()=>[U(R(p),1)]),_:2},1032,["to","class"])):G("",!0)]),_:1},8,["model"])],512)}}}),Xe=(t,o)=>{const r=t.__vccOpts||t;for(const[a,l]of o)r[a]=l;return r},Ye=Xe(Ge,[["__scopeId","data-v-151ac467"]]),Je=W({__name:"PageHeader",setup(t){return(o,r)=>(A(),Y(Ye,{"hide-on-scroll":!0}))}}),he=Ae("flash",()=>{const t=C(),o=C();function r(l,e="info"){o.value={message:l,severity:e}}function a(){const l=t.value;return t.value=o.value,o.value=void 0,l}return{current:t,setFlash:r,popFlash:a}}),Ke="modulepreload",Ze=function(t,o){return new URL(t,o).href},me={},le=function(o,r,a){let l=Promise.resolve();if(r&&r.length>0){const e=document.getElementsByTagName("link");l=Promise.all(r.map(n=>{if(n=Ze(n,a),n in me)return;me[n]=!0;const h=n.endsWith(".css"),w=h?'[rel="stylesheet"]':"";if(!!a)for(let u=e.length-1;u>=0;u--){const p=e[u];if(p.href===n&&(!h||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${w}`))return;const c=document.createElement("link");if(c.rel=h?"stylesheet":Ke,h||(c.as="script",c.crossOrigin=""),c.href=n,document.head.appendChild(c),h)return new Promise((u,p)=>{c.addEventListener("load",u),c.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${n}`)))})}))}return l.then(()=>o()).catch(e=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=e,window.dispatchEvent(n),!n.defaultPrevented)throw e})},fe={light:{import:()=>le(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url),media:"(prefers-color-scheme: light)"},dark:{import:()=>le(()=>Promise.resolve({}),__vite__mapDeps([1]),import.meta.url),media:"screen and (prefers-color-scheme: dark)"}};async function Qe(t){const o=[...document.querySelectorAll('style[data-vite-dev-id*="/themes/"], link[href*="/themes/"]')].map(a=>({el:a,href:[...a.attributes].find(({value:l})=>l.includes("/themes/"))?.value})).filter(({href:a})=>!!a);let r=o.find(a=>a.href.includes(`-${t}`))?.el;(r?.getAttribute("media")??"disabled")==="disabled"&&(r||await fe[t].import(),r=o.find(a=>a.href.includes(`-${t}`))?.el,r?.setAttribute("media",fe[t].media??""),o.filter(({el:a})=>a!==r).forEach(({el:a})=>a.setAttribute("media","disabled")))}function et(){const t=window.matchMedia("(prefers-color-scheme: dark)"),o=C("");function r(a){a.media.includes(": dark")&&(o.value=a.matches?"dark":"light")}ne(()=>{t.addEventListener("change",r),o.value=t.matches?"dark":"light"}),Oe(()=>{t.removeEventListener("change",r)}),ue(o,a=>{if(a)return Qe(a)})}const tt={key:0,class:"container-lg mt-5"},nt=W({__name:"App",setup(t){const o=he(),r=V(()=>o.current);return et(),(a,l)=>(A(),B(pe,null,[L(Je),r.value?(A(),B("div",tt,[L(b(De),{severity:r.value.severity,closable:!1},{default:P(()=>[U(R(r.value.message),1)]),_:1},8,["severity"])])):G("",!0),L(b(Pe),{class:"container-lg py-3"})],64))}});var rt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ge={exports:{}};(function(t,o){(function(r,a){t.exports=a()})(rt,function(){return(()=>{var r={870:(e,n,h)=>{h.r(n),h.d(n,{createEndpoint:()=>y,expose:()=>D,proxy:()=>Q,proxyMarker:()=>w,releaseProxy:()=>c,transfer:()=>j,transferHandlers:()=>S,windowEndpoint:()=>_e,wrap:()=>i});const w=Symbol("Comlink.proxy"),y=Symbol("Comlink.endpoint"),c=Symbol("Comlink.releaseProxy"),u=Symbol("Comlink.thrown"),p=s=>typeof s=="object"&&s!==null||typeof s=="function",S=new Map([["proxy",{canHandle:s=>p(s)&&s[w],serialize(s){const{port1:f,port2:x}=new MessageChannel;return D(s,f),[x,[x]]},deserialize:s=>(s.start(),i(s))}],["throw",{canHandle:s=>p(s)&&u in s,serialize({value:s}){let f;return f=s instanceof Error?{isError:!0,value:{message:s.message,name:s.name,stack:s.stack}}:{isError:!1,value:s},[f,[]]},deserialize(s){throw s.isError?Object.assign(new Error(s.value.message),s.value):s.value}}]]);function D(s,f=self){f.addEventListener("message",function x(_){if(!_||!_.data)return;const{id:M,type:H,path:E}=Object.assign({path:[]},_.data),$=(_.data.argumentList||[]).map(I);let k;try{const O=E.slice(0,-1).reduce((T,J)=>T[J],s),z=E.reduce((T,J)=>T[J],s);switch(H){case 0:k=z;break;case 1:O[E.slice(-1)[0]]=I(_.data.value),k=!0;break;case 2:k=z.apply(O,$);break;case 3:k=Q(new z(...$));break;case 4:{const{port1:T,port2:J}=new MessageChannel;D(s,J),k=j(T,[T])}break;case 5:k=void 0}}catch(O){k={value:O,[u]:0}}Promise.resolve(k).catch(O=>({value:O,[u]:0})).then(O=>{const[z,T]=ae(O);f.postMessage(Object.assign(Object.assign({},z),{id:M}),T),H===5&&(f.removeEventListener("message",x),Z(f))})}),f.start&&f.start()}function Z(s){(function(f){return f.constructor.name==="MessagePort"})(s)&&s.close()}function i(s,f){return g(s,[],f)}function d(s){if(s)throw new Error("Proxy has been released and is not useable")}function g(s,f=[],x=function(){}){let _=!1;const M=new Proxy(x,{get(H,E){if(d(_),E===c)return()=>F(s,{type:5,path:f.map($=>$.toString())}).then(()=>{Z(s),_=!0});if(E==="then"){if(f.length===0)return{then:()=>M};const $=F(s,{type:0,path:f.map(k=>k.toString())}).then(I);return $.then.bind($)}return g(s,[...f,E])},set(H,E,$){d(_);const[k,O]=ae($);return F(s,{type:1,path:[...f,E].map(z=>z.toString()),value:k},O).then(I)},apply(H,E,$){d(_);const k=f[f.length-1];if(k===y)return F(s,{type:4}).then(I);if(k==="bind")return g(s,f.slice(0,-1));const[O,z]=m($);return F(s,{type:2,path:f.map(T=>T.toString()),argumentList:O},z).then(I)},construct(H,E){d(_);const[$,k]=m(E);return F(s,{type:3,path:f.map(O=>O.toString()),argumentList:$},k).then(I)}});return M}function m(s){const f=s.map(ae);return[f.map(_=>_[0]),(x=f.map(_=>_[1]),Array.prototype.concat.apply([],x))];var x}const v=new WeakMap;function j(s,f){return v.set(s,f),s}function Q(s){return Object.assign(s,{[w]:!0})}function _e(s,f=self,x="*"){return{postMessage:(_,M)=>s.postMessage(_,x,M),addEventListener:f.addEventListener.bind(f),removeEventListener:f.removeEventListener.bind(f)}}function ae(s){for(const[f,x]of S)if(x.canHandle(s)){const[_,M]=x.serialize(s);return[{type:3,name:f,value:_},M]}return[{type:0,value:s},v.get(s)||[]]}function I(s){switch(s.type){case 3:return S.get(s.name).deserialize(s.value);case 0:return s.value}}function F(s,f,x){return new Promise(_=>{const M=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");s.addEventListener("message",function H(E){E.data&&E.data.id&&E.data.id===M&&(s.removeEventListener("message",H),_(E.data))}),s.start&&s.start(),s.postMessage(Object.assign({id:M},f),x)})}},162:function(e,n,h){var w=this&&this.__createBinding||(Object.create?function(i,d,g,m){m===void 0&&(m=g),Object.defineProperty(i,m,{enumerable:!0,get:function(){return d[g]}})}:function(i,d,g,m){m===void 0&&(m=g),i[m]=d[g]}),y=this&&this.__setModuleDefault||(Object.create?function(i,d){Object.defineProperty(i,"default",{enumerable:!0,value:d})}:function(i,d){i.default=d}),c=this&&this.__importStar||function(i){if(i&&i.__esModule)return i;var d={};if(i!=null)for(var g in i)g!=="default"&&Object.prototype.hasOwnProperty.call(i,g)&&w(d,i,g);return y(d,i),d};Object.defineProperty(n,"__esModule",{value:!0}),n.createDbWorker=void 0;const u=c(h(870));async function p(i){if(i.data&&i.data.action==="eval"){const d=new Int32Array(i.data.notify,0,2),g=new Uint8Array(i.data.notify,8);let m;try{m={ok:await Z(i.data.request)}}catch(j){console.error("worker request error",i.data.request,j),m={err:String(j)}}const v=new TextEncoder().encode(JSON.stringify(m));g.set(v,0),d[1]=v.length,Atomics.notify(d,0)}}function S(i){if(i.tagName==="BODY")return"body";const d=[];for(;i.parentElement&&i.tagName!=="BODY";){if(i.id){d.unshift("#"+i.id);break}{let g=1,m=i;for(;m.previousElementSibling;)m=m.previousElementSibling,g++;d.unshift(i.tagName.toLowerCase()+":nth-child("+g+")")}i=i.parentElement}return d.join(" > ")}function D(i){return Object.keys(i)}async function Z(i){if(console.log("dom vtable request",i),i.type==="select")return[...document.querySelectorAll(i.selector)].map(d=>{const g={};for(const m of i.columns)m==="selector"?g.selector=S(d):m==="parent"?d.parentElement&&(g.parent=d.parentElement?S(d.parentElement):null):m==="idx"||(g[m]=d[m]);return g});if(i.type==="insert"){if(!i.value.parent)throw Error('"parent" column must be set when inserting');const d=document.querySelectorAll(i.value.parent);if(d.length===0)throw Error(`Parent element ${i.value.parent} could not be found`);if(d.length>1)throw Error(`Parent element ${i.value.parent} ambiguous (${d.length} results)`);const g=d[0];if(!i.value.tagName)throw Error("tagName must be set for inserting");const m=document.createElement(i.value.tagName);for(const v of D(i.value))if(i.value[v]!==null){if(v==="tagName"||v==="parent")continue;if(v==="idx"||v==="selector")throw Error(`${v} can't be set`);m[v]=i.value[v]}return g.appendChild(m),null}if(i.type==="update"){const d=document.querySelector(i.value.selector);if(!d)throw Error(`Element ${i.value.selector} not found!`);const g=[];for(const m of D(i.value)){const v=i.value[m];if(m!=="parent"){if(m!=="idx"&&m!=="selector"&&v!==d[m]){if(console.log("SETTING ",m,d[m],"->",v),m==="tagName")throw Error("can't change tagName");g.push(m)}}else if(v!==S(d.parentElement)){const j=document.querySelectorAll(v);if(j.length!==1)throw Error(`Invalid target parent: found ${j.length} matches`);j[0].appendChild(d)}}for(const m of g)d[m]=i.value[m];return null}throw Error(`unknown request ${i.type}`)}u.transferHandlers.set("WORKERSQLPROXIES",{canHandle:i=>!1,serialize(i){throw Error("no")},deserialize:i=>(i.start(),u.wrap(i))}),n.createDbWorker=async function(i,d,g,m=1/0){const v=new Worker(d),j=u.wrap(v),Q=await j.SplitFileHttpDatabase(g,i,void 0,m);return v.addEventListener("message",p),{db:Q,worker:j,configs:i}}},432:function(e,n,h){var w=this&&this.__createBinding||(Object.create?function(c,u,p,S){S===void 0&&(S=p),Object.defineProperty(c,S,{enumerable:!0,get:function(){return u[p]}})}:function(c,u,p,S){S===void 0&&(S=p),c[S]=u[p]}),y=this&&this.__exportStar||function(c,u){for(var p in c)p==="default"||Object.prototype.hasOwnProperty.call(u,p)||w(u,c,p)};Object.defineProperty(n,"__esModule",{value:!0}),y(h(162),n)}},a={};function l(e){var n=a[e];if(n!==void 0)return n.exports;var h=a[e]={exports:{}};return r[e].call(h.exports,h,h.exports,l),h.exports}return l.d=(e,n)=>{for(var h in n)l.o(n,h)&&!l.o(e,h)&&Object.defineProperty(e,h,{enumerable:!0,get:n[h]})},l.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),l.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l(432)})()})})(ge);var at=ge.exports;const ot=window.location.href.replace(/[?&#].*$/,"").replace(/\w+\.\w+\/*$/,"").replace(/\/+$/,""),st=new URL(""+new URL("sqlite.worker@zEt9nnv6.js",import.meta.url).href,import.meta.url),it=new URL(""+new URL("sql-wasm@b-4EaVKI.wasm",import.meta.url).href,import.meta.url),lt=10*1024*1024;function ct(t,o){const r={};for(let a=0;a<t.length;a++)r[t[a]]=o[a];return r}let oe;async function ut(){if(!oe){const t=window.location.href.match(/:\/\/(?:[0-9]+|localhost|[^\/]+\.local)\b/)?`${ot}/data/bsfree.db`:"https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcGVYWWltRHpQaWRnOVZpN0JyeHBNR21sdTZFN3c_ZT04ZGNocnc/root/content";oe=await at.createDbWorker([{from:"inline",config:{serverMode:"full",requestChunkSize:4096,url:t}}],st.toString(),it.toString(),lt)}return oe}const dt=new TextDecoder;function mt(t){const o=new Uint8Array(t.length);for(let r=0;r<t.length;r++)o[r]=t.charCodeAt(r);return dt.decode(o).replaceAll(/&#([0-9]+);/g,(r,a)=>String.fromCharCode(a)).replaceAll("&amp;","&").replaceAll("&lt;","<").replaceAll("&gt;",">").replaceAll("&quot;","'").replaceAll(/<br ?\/?>?/gi,`
`).replaceAll(/br ?\/?>/gi,`
`).replaceAll(/\s*<p>/gi,`
`).replaceAll(/\s*<\/p> */gi,`
`).replaceAll(/<[a-z]+ ?\/?> */gi,"").replaceAll(/<\/[a-z]+> */gi,"").trim()}const ft=new TextEncoder;async function pt(t){const o=await window.crypto.subtle.digest("SHA-256",ft.encode(t));return Array.from(new Uint8Array(o),r=>r.toString(16).padStart(2,"0")).join("")}const se=new Map;async function K(t,o){const r=await pt(JSON.stringify({sql:t,params:o}));if(se.has(r))return se.get(r);const a=await ut(),l=Date.now();let e;try{e=await a.db.exec(t,o)}finally{console.info("executed statement",{bytesRead:await a.worker.bytesRead,elapsed:Date.now()-l,params:o,sql:t})}a.worker.bytesRead=0;let n=[];return e.length===1&&(n=e[0].values.map(h=>ct(e[0].columns,h.map(w=>typeof w=="string"?mt(w):w)))),se.set(r,n),n}async function ye(t){const o=await K("select name from systems where id = ?",[t]);if(o.length)return o[0].name}const ht=async()=>await K(`
  select s1.id, min(s1.name) as name, sum(s2.qty) as qty
  from systems s1
  join systems s2 on s2.group_id = s1.id
  where s1.id in (select distinct group_id from systems)
  group by s1.id
  order by name, s1.id
`);async function gt(t){const o=await K(`
    select s.id      as system_id,
           s.name    as system_name,
           g.id      as game_uid,
           g.game_id as game_id,
           g.name    as game_name,
           g.version as game_version,
           g.qty     as game_qty,
           d.id      as device_id,
           d.name    as device_name
    from games g
    join systems s on s.id = g.system_id
    join devices d on d.id = g.device_id
    where g.qty > 0 and g.system_id in (select id from systems where group_id = ?)
    order by g.name, g.version, g.id, s.name, s.name, d.name, d.id
  `,[t]),r={},a={},l={};for(const e of o)if(e.device_id in r||(r[e.device_id]={id:e.device_id,name:e.device_name}),e.system_id in a||(a[e.system_id]={id:e.system_id,name:e.system_name}),!(e.game_uid in l)){const n=l[e.game_uid]={uid:e.game_uid,id:e.game_id,name:e.game_name,system:a[e.system_id],device:r[e.device_id],qty:e.game_qty};e.game_version!==null&&(n.version=e.game_version)}return Object.values(l).sort((e,n)=>e.name.localeCompare(n.name)||e.id-n.id||e.device.name.localeCompare(n.device.name)||e.device.id-n.device.id)}async function yt(t){const o=await K("select name from games where id = ?",[t]);if(o.length)return o[0].name}async function vt(t){const o=await K(`
    select s.id     as section_id,
           s.name   as section_name,
           c.id      as code_id,
           c.name    as code_name,
           c.note    as code_note,
           c.code    as code_code,
           a.id      as author_id,
           a.name    as author_name
    from codes c
    left join sections s on s.id = c.section_id
    left join authors a on a.id = c.author_id
    where c.game_uid = ?
    order by c.id
  `,[t]),r=[],a={},l={};for(const e of o){const n={id:e.code_id,name:e.code_name,code:e.code_code};e.code_note!==null&&(n.note=e.code_note),e.author_id&&(e.author_id in l||(l[e.author_id]={id:e.author_id,name:e.author_name}),n.author=l[e.author_id]),e.section_id?(e.section_id in a||(a[e.section_id]={id:e.section_id,name:e.section_name,codes:[]}),a[e.section_id].codes.push(n)):r.push(n)}return{codes:r,sections:Object.values(a)}}const _t={class:"mb-1"},wt=W({__name:"CodesTable",props:{group:{type:Object,required:!0}},setup(t){function o(l){const e={};return l.match(/\(M\)|\[M\]|must be/i)&&(e.fontWeight="bold"),e}const r=new RegExp(atob(["Y29ja3N1Y2tpbmdwaWVjZW9mc2hpdA=="].join("|")),"ig");function a(l){return l?.name.replaceAll(/ *[&,;] */g,",").replaceAll(/(\w)@[^ ,]*/g,"$1").replaceAll(r,"").split(",").map(e=>e.trim()).filter(Boolean).sort().join("; ")}return(l,e)=>(A(),Y(b(de),{value:t.group.codes,"data-key":"id",size:"small",class:"text-sm",style:{"white-space":"pre-line"}},$e({default:P(()=>[L(b(q),{header:"Description",class:"col-3"},{body:P(n=>[N("span",{style:je(o(n.data.name))},R(n.data.name),5)]),_:1}),L(b(q),{field:"note",header:"Notes",class:"col-4 text-xs text-justify"}),L(b(q),{field:"code",header:"Code",class:"col-2",style:{"font-family":"monospace"}}),L(b(q),{header:"Author",class:"col-3"},{body:P(n=>[U(R(a(n.data.author)),1)]),_:1})]),_:2},[t.group.name?{name:"header",fn:P(()=>[N("h3",_t,R(t.group.name),1)]),key:"0"}:void 0]),1032,["value"]))}});async function ce(t,o,r,a){if(t.state[o])r.value=t.state[o];else{const l=await a();if(l){r.value=l;const e=t.state;e[o]=l,t.replace(t.location,e)}}}const bt={key:0,class:"mb-0"},St=W({__name:"GameView",props:{systemId:{type:String,required:!0},systemSlug:{type:String,required:!0},id:{type:String,required:!0},slug:{type:String,required:!0}},setup(t){const o=te(),r=t,a=C(""),l=C(""),e=V(()=>l.value&&a.value?`${l.value} - ${a.value}`:void 0),n=C(),h=V(()=>{const c=[];return n.value?.codes.length&&c.push({id:0,codes:n.value.codes}),n.value?.sections.forEach(u=>{c.push({id:u.id,name:u.name,codes:u.codes})}),c}),w=V(()=>n.value?n.value.codes.length+n.value.sections.reduce((c,u)=>c+u.codes.length,0):0);async function y(){const c=o.options.history;await Promise.all([ce(c,"name",l,()=>yt(r.id)),ce(c,"systemName",a,()=>ye(r.systemId)),vt(r.id).then(u=>n.value=u)])}return ne(y),ue(o.currentRoute,y),(c,u)=>(A(),B("main",null,[e.value?(A(),B("h1",bt,R(e.value),1)):G("",!0),N("p",null,R(n.value?`${w.value.toLocaleString()} codes`:"Loading"),1),(A(!0),B(pe,null,Re(h.value,p=>(A(),Y(wt,{key:p.id,group:p},null,8,["group"]))),128))]))}}),Et=N("h1",null,"BSFree Archive",-1),kt=N("p",null,[U(" This is an unofficial archive of cheat codes contained on "),N("a",{href:"https://web.archive.org/web/20210225044111/http://bsfree.org/",target:"_blank"},"bsfree.org"),U(". ")],-1),Lt=W({__name:"HomeView",setup(t){const o=te(),r=C(),a=V(()=>r.value?r.value.reduce((e,n)=>e+n.qty,0):0);ne(async()=>{r.value=await ht()});function l(e){o.push({name:"system",params:{id:e.data.id,slug:e.data.name.toLowerCase().replaceAll(/[^a-z0-9 ]/gi,"").replaceAll(/ /g,"-")},state:{name:e.data.name}})}return(e,n)=>(A(),B("main",null,[Et,kt,N("p",null,R(r.value?`${a.value.toLocaleString()} codes`:"Loading"),1),a.value?(A(),Y(b(de),{key:0,value:r.value,"data-key":"uid","selection-mode":"single",size:"small",class:"pl-0 sm:col-10 md:col-6 xl:col-5",onRowSelect:l},{default:P(()=>[L(b(q),{field:"name",header:"System",class:"col-10"}),L(b(q),{header:"Codes",class:"col-2 text-right"},{body:P(h=>[U(R(h.data.qty.toLocaleString()),1)]),_:1})]),_:1},8,["value"])):G("",!0)]))}}),xt={key:0},At={class:"flex justify-content-end"},Ot={class:"p-input-icon-left"},Pt=N("i",{class:"pi pi-search"},null,-1),$t=W({__name:"SystemView",props:{id:{type:String,required:!0},slug:{type:String,required:!0}},setup(t){const o=te(),r=t,a=C({global:{value:"",matchMode:"contains"}}),l=C(""),e=C(),n=V(()=>e.value?e.value.reduce((c,u)=>c+u.qty,0):0);async function h(){const c=o.options.history;await Promise.all([ce(c,"name",l,()=>ye(r.id)),gt(r.id).then(u=>e.value=u)])}ne(h),ue(o.currentRoute,h);const w=["FirstPageLink","PrevPageLink","PageLinks","NextPageLink","LastPageLink","JumpToPageDropdown","CurrentPageReport"].join(" ");function y(c){o.push({name:"game",params:{systemId:r.id,systemSlug:r.slug,id:c.data.uid,slug:c.data.name.toLowerCase().replaceAll(/[^a-z0-9 ]/gi,"").replaceAll(/ /g,"-")},state:{systemName:l.value,name:c.data.name}})}return(c,u)=>(A(),B("main",null,[l.value?(A(),B("h1",xt,R(l.value),1)):G("",!0),N("p",null,R(e.value?`${n.value.toLocaleString()} codes`:"Loading"),1),e.value?.length?(A(),Y(b(de),{key:1,filters:a.value,"onUpdate:filters":u[1]||(u[1]=p=>a.value=p),value:e.value,"data-key":"id","global-filter-fields":["name","version","device.name","system.name"],"selection-mode":"single",size:"small","sort-mode":"multiple",paginator:"","paginator-position":"both","paginator-template":b(w),"page-link-size":8,rows:50,onRowSelect:y},{header:P(()=>[N("div",At,[N("span",Ot,[Pt,L(b(ze),{modelValue:a.value.global.value,"onUpdate:modelValue":u[0]||(u[0]=p=>a.value.global.value=p),placeholder:"Search"},null,8,["modelValue"])])])]),default:P(()=>[L(b(q),{field:"name",header:"Game",sortable:!0}),L(b(q),{field:"version",header:"Version",sortable:!0}),L(b(q),{field:"device.name",header:"Device",sortable:!0}),L(b(q),{field:"system.name",header:"System",sortable:!0}),L(b(q),{header:"Codes",class:"col-1 text-right"},{body:P(p=>[U(R(p.data.qty.toLocaleString()),1)]),_:1})]),_:1},8,["filters","value","global-filter-fields","paginator-template"])):G("",!0)]))}}),ve=Ne({history:Me(),routes:[{component:Lt,name:"home",path:"/",meta:{showInNav:!0}},{component:$t,name:"system",path:"/systems/:id/:slug",props:!0},{component:St,name:"game",path:"/systems/:systemId/:systemSlug/games/:id/:slug",props:!0},{component:()=>le(()=>import("./NotFoundView@Ve1yAmSt.js"),__vite__mapDeps([2,3,4,5]),import.meta.url),name:"not-found",path:"/:params(.*)*"}]});let ie;ve.beforeEach((t,o,r)=>{const a=t.meta;a.title&&(document.title=a.title),ie||(ie=he()),ie.popFlash(),r()});const re=qe(nt);re.use(Ce());re.use(ve);re.use(Be);re.mount("#app");
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./themes/viva-light@H8a1X4Aj.css","./themes/viva-dark@qyr74qbj.css","./NotFoundView@Ve1yAmSt.js","./primevue@JRHUw1Xt.js","./vue@VMVV_7_-.js","./primevue@_t5YR9K2.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}