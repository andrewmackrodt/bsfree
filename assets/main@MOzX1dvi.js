import{I as Y,a as T,J as ve,K as oe,o as Ee,L as Le,M as G,f as fe,c as q,d as V,y as x,j as A,t as xe,u as M,C as X,i as Z,q as J,N as L,O as Ae,P as Oe,e as C,Q as $e,R as se,S as Pe,w as pe,F as _e,U as qe,D as je,x as Me,s as Ce,V as Re,W as Ne,X as Te,Y as De}from"./vue@VMVV_7_-.js";import{s as Ie,a as He,b as H,c as ge,d as ze,P as Be}from"./primevue@JRHUw1Xt.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const e of l)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(l){const e={};return l.integrity&&(e.integrity=l.integrity),l.referrerPolicy&&(e.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?e.credentials="include":l.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(l){if(l.ep)return;l.ep=!0;const e=t(l);fetch(l.href,e)}})();const Ue=""+new URL("logo@DxTsBerY.png",import.meta.url).href;let ne={scrollX:-1,scrollY:-1};const Q=[];function Ve(){const n=function(){const a={scrollX:window.scrollX,scrollY:window.scrollY};if(a.scrollX!==ne.scrollX||a.scrollY!==ne.scrollY)for(const t of Q)t(a,ne);ne=a,Q.length>0&&requestAnimationFrame(n)};requestAnimationFrame(n)}function We(n){Q.push(n),Q.length===1&&Ve()}function Fe(n){const a=Q.indexOf(n);a>=0&&Q.splice(a,1)}const Ge=n=>(Ae("data-v-151ac467"),n=n(),Oe(),n),Xe=Ge(()=>C("img",{alt:"logo",src:Ue,class:"h-full"},null,-1)),Ye=Y({__name:"Navbar",props:{hideOnScroll:Boolean},setup(n){const a=T(null),t=ve(),s=oe(),l=n;function e(v){let u=0;return({scrollY:f},{scrollY:h})=>{if(h!==-1){if(f>h){if(u>=v.scrollHeight)return;u=Math.min(v.scrollHeight,u+(f-h))}else{if(u<=0)return;u=Math.max(0,u+(f-h))}v.style.opacity=(1-u*(1/v.scrollHeight)).toString(),v.style.top=`-${u}px`}}}let r=null;Ee(()=>{l.hideOnScroll&&(r=e(a.value),We(r))}),Le(()=>{r&&Fe(r)});function d(v){return v.split(/[_-]/).map(u=>u[0].toUpperCase()+u.slice(1)).join(" ")}const _=G(()=>{const v=s.options.routes.filter(f=>f.meta?.showInNav),u=t.path;return v.map(f=>({label:f.meta?.title||d(f.name),selected:f.path===u,target:f.path}))});return(v,u)=>{const f=fe("router-link");return q(),V("header",{ref_key:"$el",ref:a,class:"bg-dark sticky py-2",style:{top:"0"}},[x(L(Ie),{model:_.value,class:"container-lg h-3rem bg-transparent border-none border-noround"},{start:A(()=>[x(f,{to:"/",class:"hidden lg:block",style:{height:"60px"}},{default:A(()=>[Xe]),_:1})]),item:A(({label:h,item:k,item:{target:N}})=>[N?(q(),Z(f,{key:0,to:N,class:xe(k.selected?"selected":"")},{default:A(()=>[X(M(h),1)]),_:2},1032,["to","class"])):J("",!0)]),_:1},8,["model"])],512)}}}),Ke=(n,a)=>{const t=n.__vccOpts||n;for(const[s,l]of a)t[s]=l;return t},Je=Ke(Ye,[["__scopeId","data-v-151ac467"]]),Qe=Y({__name:"PageHeader",setup(n){return(a,t)=>(q(),Z(Je,{"hide-on-scroll":!0}))}}),be=$e("flash",()=>{const n=T(),a=T();function t(l,e="info"){a.value={message:l,severity:e}}function s(){const l=n.value;return n.value=a.value,a.value=void 0,l}return{current:n,setFlash:t,popFlash:s}}),Ze="modulepreload",et=function(n,a){return new URL(n,a).href},he={},de=function(a,t,s){let l=Promise.resolve();if(t&&t.length>0){const e=document.getElementsByTagName("link");l=Promise.all(t.map(r=>{if(r=et(r,s),r in he)return;he[r]=!0;const d=r.endsWith(".css"),_=d?'[rel="stylesheet"]':"";if(!!s)for(let f=e.length-1;f>=0;f--){const h=e[f];if(h.href===r&&(!d||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${_}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Ze,d||(u.as="script",u.crossOrigin=""),u.href=r,document.head.appendChild(u),d)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${r}`)))})}))}return l.then(()=>a()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},ye={light:{import:()=>de(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url),media:"(prefers-color-scheme: light)"},dark:{import:()=>de(()=>Promise.resolve({}),__vite__mapDeps([1]),import.meta.url),media:"screen and (prefers-color-scheme: dark)"}};async function tt(n){const a=[...document.querySelectorAll('style[data-vite-dev-id*="/themes/"], link[href*="/themes/"]')].map(s=>({el:s,href:[...s.attributes].find(({value:l})=>l.includes("/themes/"))?.value})).filter(({href:s})=>!!s);let t=a.find(s=>s.href.includes(`-${n}`))?.el;(t?.getAttribute("media")??"disabled")==="disabled"&&(t||await ye[n].import(),t=a.find(s=>s.href.includes(`-${n}`))?.el,t?.setAttribute("media",ye[n].media??""),a.filter(({el:s})=>s!==t).forEach(({el:s})=>s.setAttribute("media","disabled")))}function nt(){const n=window.matchMedia("(prefers-color-scheme: dark)"),a=T("");function t(s){s.media.includes(": dark")&&(a.value=s.matches?"dark":"light")}se(()=>{n.addEventListener("change",t),a.value=n.matches?"dark":"light"}),Pe(()=>{n.removeEventListener("change",t)}),pe(a,s=>{if(s)return tt(s)})}const rt={key:0,class:"container-lg mt-5"},at=Y({__name:"App",setup(n){const a=be(),t=G(()=>a.current);return nt(),(s,l)=>(q(),V(_e,null,[x(Qe),t.value?(q(),V("div",rt,[x(L(He),{severity:t.value.severity,closable:!1},{default:A(()=>[X(M(t.value.message),1)]),_:1},8,["severity"])])):J("",!0),x(L(qe),{class:"container-lg py-3"})],64))}});var ot=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},we={exports:{}};(function(n,a){(function(t,s){n.exports=s()})(ot,function(){return(()=>{var t={870:(e,r,d)=>{d.r(r),d.d(r,{createEndpoint:()=>v,expose:()=>N,proxy:()=>w,proxyMarker:()=>_,releaseProxy:()=>u,transfer:()=>b,transferHandlers:()=>k,windowEndpoint:()=>z,wrap:()=>i});const _=Symbol("Comlink.proxy"),v=Symbol("Comlink.endpoint"),u=Symbol("Comlink.releaseProxy"),f=Symbol("Comlink.thrown"),h=o=>typeof o=="object"&&o!==null||typeof o=="function",k=new Map([["proxy",{canHandle:o=>h(o)&&o[_],serialize(o){const{port1:m,port2:P}=new MessageChannel;return N(o,m),[P,[P]]},deserialize:o=>(o.start(),i(o))}],["throw",{canHandle:o=>h(o)&&f in o,serialize({value:o}){let m;return m=o instanceof Error?{isError:!0,value:{message:o.message,name:o.name,stack:o.stack}}:{isError:!1,value:o},[m,[]]},deserialize(o){throw o.isError?Object.assign(new Error(o.value.message),o.value):o.value}}]]);function N(o,m=self){m.addEventListener("message",function P(S){if(!S||!S.data)return;const{id:I,type:F,path:O}=Object.assign({path:[]},S.data),R=(S.data.argumentList||[]).map(E);let $;try{const j=O.slice(0,-1).reduce((B,ee)=>B[ee],o),U=O.reduce((B,ee)=>B[ee],o);switch(F){case 0:$=U;break;case 1:j[O.slice(-1)[0]]=E(S.data.value),$=!0;break;case 2:$=U.apply(j,R);break;case 3:$=w(new U(...R));break;case 4:{const{port1:B,port2:ee}=new MessageChannel;N(o,ee),$=b(B,[B])}break;case 5:$=void 0}}catch(j){$={value:j,[f]:0}}Promise.resolve($).catch(j=>({value:j,[f]:0})).then(j=>{const[U,B]=W(j);m.postMessage(Object.assign(Object.assign({},U),{id:I}),B),F===5&&(m.removeEventListener("message",P),K(m))})}),m.start&&m.start()}function K(o){(function(m){return m.constructor.name==="MessagePort"})(o)&&o.close()}function i(o,m){return y(o,[],m)}function g(o){if(o)throw new Error("Proxy has been released and is not useable")}function y(o,m=[],P=function(){}){let S=!1;const I=new Proxy(P,{get(F,O){if(g(S),O===u)return()=>D(o,{type:5,path:m.map(R=>R.toString())}).then(()=>{K(o),S=!0});if(O==="then"){if(m.length===0)return{then:()=>I};const R=D(o,{type:0,path:m.map($=>$.toString())}).then(E);return R.then.bind(R)}return y(o,[...m,O])},set(F,O,R){g(S);const[$,j]=W(R);return D(o,{type:1,path:[...m,O].map(U=>U.toString()),value:$},j).then(E)},apply(F,O,R){g(S);const $=m[m.length-1];if($===v)return D(o,{type:4}).then(E);if($==="bind")return y(o,m.slice(0,-1));const[j,U]=c(R);return D(o,{type:2,path:m.map(B=>B.toString()),argumentList:j},U).then(E)},construct(F,O){g(S);const[R,$]=c(O);return D(o,{type:3,path:m.map(j=>j.toString()),argumentList:R},$).then(E)}});return I}function c(o){const m=o.map(W);return[m.map(S=>S[0]),(P=m.map(S=>S[1]),Array.prototype.concat.apply([],P))];var P}const p=new WeakMap;function b(o,m){return p.set(o,m),o}function w(o){return Object.assign(o,{[_]:!0})}function z(o,m=self,P="*"){return{postMessage:(S,I)=>o.postMessage(S,P,I),addEventListener:m.addEventListener.bind(m),removeEventListener:m.removeEventListener.bind(m)}}function W(o){for(const[m,P]of k)if(P.canHandle(o)){const[S,I]=P.serialize(o);return[{type:3,name:m,value:S},I]}return[{type:0,value:o},p.get(o)||[]]}function E(o){switch(o.type){case 3:return k.get(o.name).deserialize(o.value);case 0:return o.value}}function D(o,m,P){return new Promise(S=>{const I=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");o.addEventListener("message",function F(O){O.data&&O.data.id&&O.data.id===I&&(o.removeEventListener("message",F),S(O.data))}),o.start&&o.start(),o.postMessage(Object.assign({id:I},m),P)})}},162:function(e,r,d){var _=this&&this.__createBinding||(Object.create?function(i,g,y,c){c===void 0&&(c=y),Object.defineProperty(i,c,{enumerable:!0,get:function(){return g[y]}})}:function(i,g,y,c){c===void 0&&(c=y),i[c]=g[y]}),v=this&&this.__setModuleDefault||(Object.create?function(i,g){Object.defineProperty(i,"default",{enumerable:!0,value:g})}:function(i,g){i.default=g}),u=this&&this.__importStar||function(i){if(i&&i.__esModule)return i;var g={};if(i!=null)for(var y in i)y!=="default"&&Object.prototype.hasOwnProperty.call(i,y)&&_(g,i,y);return v(g,i),g};Object.defineProperty(r,"__esModule",{value:!0}),r.createDbWorker=void 0;const f=u(d(870));async function h(i){if(i.data&&i.data.action==="eval"){const g=new Int32Array(i.data.notify,0,2),y=new Uint8Array(i.data.notify,8);let c;try{c={ok:await K(i.data.request)}}catch(b){console.error("worker request error",i.data.request,b),c={err:String(b)}}const p=new TextEncoder().encode(JSON.stringify(c));y.set(p,0),g[1]=p.length,Atomics.notify(g,0)}}function k(i){if(i.tagName==="BODY")return"body";const g=[];for(;i.parentElement&&i.tagName!=="BODY";){if(i.id){g.unshift("#"+i.id);break}{let y=1,c=i;for(;c.previousElementSibling;)c=c.previousElementSibling,y++;g.unshift(i.tagName.toLowerCase()+":nth-child("+y+")")}i=i.parentElement}return g.join(" > ")}function N(i){return Object.keys(i)}async function K(i){if(console.log("dom vtable request",i),i.type==="select")return[...document.querySelectorAll(i.selector)].map(g=>{const y={};for(const c of i.columns)c==="selector"?y.selector=k(g):c==="parent"?g.parentElement&&(y.parent=g.parentElement?k(g.parentElement):null):c==="idx"||(y[c]=g[c]);return y});if(i.type==="insert"){if(!i.value.parent)throw Error('"parent" column must be set when inserting');const g=document.querySelectorAll(i.value.parent);if(g.length===0)throw Error(`Parent element ${i.value.parent} could not be found`);if(g.length>1)throw Error(`Parent element ${i.value.parent} ambiguous (${g.length} results)`);const y=g[0];if(!i.value.tagName)throw Error("tagName must be set for inserting");const c=document.createElement(i.value.tagName);for(const p of N(i.value))if(i.value[p]!==null){if(p==="tagName"||p==="parent")continue;if(p==="idx"||p==="selector")throw Error(`${p} can't be set`);c[p]=i.value[p]}return y.appendChild(c),null}if(i.type==="update"){const g=document.querySelector(i.value.selector);if(!g)throw Error(`Element ${i.value.selector} not found!`);const y=[];for(const c of N(i.value)){const p=i.value[c];if(c!=="parent"){if(c!=="idx"&&c!=="selector"&&p!==g[c]){if(console.log("SETTING ",c,g[c],"->",p),c==="tagName")throw Error("can't change tagName");y.push(c)}}else if(p!==k(g.parentElement)){const b=document.querySelectorAll(p);if(b.length!==1)throw Error(`Invalid target parent: found ${b.length} matches`);b[0].appendChild(g)}}for(const c of y)g[c]=i.value[c];return null}throw Error(`unknown request ${i.type}`)}f.transferHandlers.set("WORKERSQLPROXIES",{canHandle:i=>!1,serialize(i){throw Error("no")},deserialize:i=>(i.start(),f.wrap(i))}),r.createDbWorker=async function(i,g,y,c=1/0){const p=new Worker(g),b=f.wrap(p),w=await b.SplitFileHttpDatabase(y,i,void 0,c);return p.addEventListener("message",h),{db:w,worker:b,configs:i}}},432:function(e,r,d){var _=this&&this.__createBinding||(Object.create?function(u,f,h,k){k===void 0&&(k=h),Object.defineProperty(u,k,{enumerable:!0,get:function(){return f[h]}})}:function(u,f,h,k){k===void 0&&(k=h),u[k]=f[h]}),v=this&&this.__exportStar||function(u,f){for(var h in u)h==="default"||Object.prototype.hasOwnProperty.call(f,h)||_(f,u,h)};Object.defineProperty(r,"__esModule",{value:!0}),v(d(162),r)}},s={};function l(e){var r=s[e];if(r!==void 0)return r.exports;var d=s[e]={exports:{}};return t[e].call(d.exports,d,d.exports,l),d.exports}return l.d=(e,r)=>{for(var d in r)l.o(r,d)&&!l.o(e,d)&&Object.defineProperty(e,d,{enumerable:!0,get:r[d]})},l.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),l.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l(432)})()})})(we);var st=we.exports;const it=window.location.href.replace(/[?&#].*$/,"").replace(/\w+\.\w+\/*$/,"").replace(/\/+$/,""),lt=new URL(""+new URL("sqlite.worker@zEt9nnv6.js",import.meta.url).href,import.meta.url),ct=new URL(""+new URL("sql-wasm@b-4EaVKI.wasm",import.meta.url).href,import.meta.url),ut=10*1024*1024;function dt(n,a){const t={};for(let s=0;s<n.length;s++)t[n[s]]=a[s];return t}let le;async function mt(){if(!le){const n=window.location.href.match(/:\/\/(?:[0-9]+|localhost|[^\/]+\.local)\b/)?`${it}/data/bsfree.db`:"https://static.mackrodt.io/files/bsfree.4cfee26.db";le=await st.createDbWorker([{from:"inline",config:{serverMode:"full",requestChunkSize:4096,url:n}}],lt.toString(),ct.toString(),ut)}return le}const ft=new TextDecoder;function pt(n){const a=new Uint8Array(n.length);for(let t=0;t<n.length;t++)a[t]=n.charCodeAt(t);return ft.decode(a).replaceAll(/&#([0-9]+);/g,(t,s)=>String.fromCharCode(s)).replaceAll("&amp;","&").replaceAll("&lt;","<").replaceAll("&gt;",">").replaceAll("&quot;","'").replaceAll(/<br ?\/?>?/gi,`
`).replaceAll(/br ?\/?>/gi,`
`).replaceAll(/\s*<p>/gi,`
`).replaceAll(/\s*<\/p> */gi,`
`).replaceAll(/<[a-z]+ ?\/?> */gi,"").replaceAll(/<\/[a-z]+> */gi,"").trim()}const gt=new TextEncoder;async function ht(n){const a=await window.crypto.subtle.digest("SHA-256",gt.encode(n));return Array.from(new Uint8Array(a),t=>t.toString(16).padStart(2,"0")).join("")}const ce=new Map;async function te(n,a){const t=await ht(JSON.stringify({sql:n,params:a}));if(ce.has(t))return ce.get(t);const s=await mt(),l=Date.now();let e;try{e=await s.db.exec(n,a)}finally{console.info("executed statement",{bytesRead:await s.worker.bytesRead,elapsed:Date.now()-l,params:a,sql:n})}s.worker.bytesRead=0;let r=[];return e.length===1&&(r=e[0].values.map(d=>dt(e[0].columns,d.map(_=>typeof _=="string"?pt(_):_)))),ce.set(t,r),r}async function Se(n){const a=await te("select name from systems where id = ?",[n]);if(a.length)return a[0].name}const yt=async()=>await te(`
  select s1.id, min(s1.name) as name, sum(s2.qty) as qty
  from systems s1
  join systems s2 on s2.group_id = s1.id
  where s1.id in (select distinct group_id from systems)
  group by s1.id
  order by name, s1.id
`);async function vt(n){const a=await te(`
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
  `,[n]),t={},s={},l={};for(const e of a)if(e.device_id in t||(t[e.device_id]={id:e.device_id,name:e.device_name}),e.system_id in s||(s[e.system_id]={id:e.system_id,name:e.system_name}),!(e.game_uid in l)){const r=l[e.game_uid]={uid:e.game_uid,id:e.game_id,name:e.game_name,system:s[e.system_id],device:t[e.device_id],qty:e.game_qty};e.game_version!==null&&(r.version=e.game_version)}return Object.values(l).sort((e,r)=>e.name.localeCompare(r.name)||e.id-r.id||e.device.name.localeCompare(r.device.name)||e.device.id-r.device.id)}async function _t(n){const a=await te("select name from games where id = ?",[n]);if(a.length)return a[0].name}async function bt(n){const a=await te(`
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
  `,[n]),t=[],s={},l={};for(const e of a){const r={id:e.code_id,name:e.code_name,code:e.code_code};e.code_note!==null&&(r.note=e.code_note),e.author_id&&(e.author_id in l||(l[e.author_id]={id:e.author_id,name:e.author_name}),r.author=l[e.author_id]),e.section_id?(e.section_id in s||(s[e.section_id]={id:e.section_id,name:e.section_name,codes:[]}),s[e.section_id].codes.push(r)):t.push(r)}return{codes:t,sections:Object.values(s)}}const wt={class:"mb-1"},St=Y({__name:"CodesTable",props:{group:{type:Object,required:!0}},setup(n){function a(l){const e={};return l.match(/\(M\)|\[M\]|must be/i)&&(e.fontWeight="bold"),e}const t=new RegExp(atob(["Y29ja3N1Y2tpbmdwaWVjZW9mc2hpdA=="].join("|")),"ig");function s(l){return l?.name.replaceAll(/ *[&,;] */g,",").replaceAll(/(\w)@[^ ,]*/g,"$1").replaceAll(t,"").split(",").map(e=>e.trim()).filter(Boolean).sort().join("; ")}return(l,e)=>(q(),Z(L(ge),{value:n.group.codes,"data-key":"id",size:"small",class:"text-sm",style:{"white-space":"pre-line"}},je({default:A(()=>[x(L(H),{header:"Description",class:"col-3"},{body:A(r=>[C("span",{style:Me(a(r.data.name))},M(r.data.name),5)]),_:1}),x(L(H),{field:"note",header:"Notes",class:"col-4 text-xs text-justify"}),x(L(H),{field:"code",header:"Code",class:"col-2",style:{"font-family":"monospace"}}),x(L(H),{header:"Author",class:"col-3"},{body:A(r=>[X(M(s(r.data.author)),1)]),_:1})]),_:2},[n.group.name?{name:"header",fn:A(()=>[C("h3",wt,M(n.group.name),1)]),key:"0"}:void 0]),1032,["value"]))}});async function me(n,a,t,s){if(n.state[a])t.value=n.state[a];else{const l=await s();if(l){t.value=l;const e=n.state;e[a]=l,n.replace(n.location,e)}}}const kt={key:0,class:"mb-0"},Et=Y({__name:"GameView",props:{systemId:{type:String,required:!0},systemSlug:{type:String,required:!0},id:{type:String,required:!0},slug:{type:String,required:!0}},setup(n){const a=oe(),t=n,s=T(""),l=T(""),e=G(()=>l.value&&s.value?`${l.value} - ${s.value}`:void 0),r=T(),d=G(()=>{const u=[];return r.value?.codes.length&&u.push({id:0,codes:r.value.codes}),r.value?.sections.forEach(f=>{u.push({id:f.id,name:f.name,codes:f.codes})}),u}),_=G(()=>r.value?r.value.codes.length+r.value.sections.reduce((u,f)=>u+f.codes.length,0):0);async function v(){const u=a.options.history;await Promise.all([me(u,"name",l,()=>_t(t.id)),me(u,"systemName",s,()=>Se(t.systemId)),bt(t.id).then(f=>r.value=f)])}return se(v),pe(a.currentRoute,v),(u,f)=>(q(),V("main",null,[e.value?(q(),V("h1",kt,M(e.value),1)):J("",!0),C("p",null,M(r.value?`${_.value.toLocaleString()} codes`:"Loading"),1),(q(!0),V(_e,null,Ce(d.value,h=>(q(),Z(St,{key:h.id,group:h},null,8,["group"]))),128))]))}});function ae(n){return n.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().replaceAll(/[^a-z0-9 -]/gi,"").replaceAll(/ /g,"-").replaceAll(/-{2,}/g,"-").replace(/-$/,"")}const Lt=C("h1",null,"BSFree Archive",-1),xt=C("p",null,[X(" This is an unofficial archive of cheat codes contained on "),C("a",{href:"https://web.archive.org/web/20210225044111/http://bsfree.org/",target:"_blank"},"bsfree.org"),X(". ")],-1),At=["href","onClick"],Ot=Y({__name:"HomeView",setup(n){const a=oe(),t=T(),s=G(()=>t.value?t.value.reduce((d,_)=>d+_.qty,0):0);se(async()=>{t.value=(await yt()).map(d=>{const _=ae(d.name);return{...d,slug:_,route:a.resolve({name:"system",params:{id:d.id,slug:ae(d.name)}})}})});function l(d){return a.push({...d.route,state:{name:d.name}})}function e(d){return l(d.data)}function r(d,_){return d.preventDefault(),l(_)}return(d,_)=>{const v=fe("router-link");return q(),V("main",null,[Lt,xt,C("p",null,M(t.value?`${s.value.toLocaleString()} codes`:"Loading"),1),s.value?(q(),Z(L(ge),{key:0,value:t.value,"data-key":"uid","selection-mode":"single",size:"small",class:"pl-0 sm:col-10 md:col-6 xl:col-5",onRowSelect:e},{default:A(()=>[x(L(H),{header:"System",class:"col-10"},{body:A(u=>[x(v,{to:u.data.route,custom:""},{default:A(({href:f})=>[C("a",{class:"row-link",href:f,onClick:h=>r(h,u.data)},M(u.data.name),9,At)]),_:2},1032,["to"])]),_:1}),x(L(H),{header:"Codes",class:"col-2 text-right"},{body:A(u=>[X(M(u.data.qty.toLocaleString()),1)]),_:1})]),_:1},8,["value"])):J("",!0)])}}}),$t={key:0},Pt={class:"flex justify-content-end"},qt={class:"p-input-icon-left"},jt=C("i",{class:"pi pi-search"},null,-1),Mt=["href","onClick"],re=50,Ct=Y({__name:"SystemView",props:{id:{type:String,required:!0},slug:{type:String,required:!0}},setup(n){const a=ve(),t=oe(),s=t.options.history,l=n,e=T({global:{value:void 0,matchMode:"contains"}}),r=T(""),d=T(),_=G(()=>d.value?d.value.reduce((c,p)=>c+p.qty,0):0),v=T(0),u=G(()=>v.value/re+1);async function f(c=!0){if(e.value.global.value=t.currentRoute.value.query.search,typeof t.currentRoute.value.query.page=="string"){const p=parseInt(t.currentRoute.value.query.page);v.value=(p-1)*re}c&&await Promise.all([me(s,"name",r,()=>Se(l.id)),vt(l.id).then(p=>d.value=p?.map(b=>{const w=ae(b.name);return{...b,slug:w,route:t.resolve({name:"game",params:{systemId:l.id,systemSlug:l.slug,id:b.uid,slug:ae(b.name)}})}}))]),g()}se(f),pe(t.currentRoute,(c,p)=>f(c.path!==p.path));function h(c){let p=!1;const b=Object.assign({},a.query);for(const[w,z]of Object.entries(c))z!==t.currentRoute.value.query[w]&&(p=!0,z?b[w]=z:delete b[w]);if(p)return t.push({path:a.fullPath,query:b})}function k(){h({search:e.value.global.value,page:u.value.toString()})}function N(c){return t.push({...c.route,state:{systemName:r.value,name:c.name}})}function K(c,p){return c.preventDefault(),N(p)}const i=["FirstPageLink","PrevPageLink","PageLinks","NextPageLink","LastPageLink","JumpToPageDropdown","CurrentPageReport"].join(" ");function g(){const c=(E,D,o=!0)=>{let m=E.querySelector("a");if(m)D?m.setAttribute("href",`#${a.path}?page=${D}`):E.innerHTML=m.innerHTML;else{if(!D)return;m=document.createElement("a"),m.classList.add("page-link"),o&&m.classList.add("w-full"),m.setAttribute("href",`#${a.path}?page=${D}`),m.innerHTML=E.innerHTML,E.innerHTML=m.outerHTML}},p=document.querySelector(".p-paginator button.p-paginator-first"),b=document.querySelector(".p-paginator button.p-paginator-prev"),w=document.querySelector(".p-paginator button.p-paginator-next"),z=document.querySelector(".p-paginator button.p-paginator-last"),W=Math.ceil((d.value?.length??0)/re);if(p&&c(p,1,!1),b){const E=u.value>1?u.value-1:null;c(b,E,!1)}if(w){const E=u.value<W?u.value+1:null;c(w,E,!1)}z&&c(z,W,!1),document.querySelectorAll(".p-paginator-pages button").forEach(E=>c(E,E.textContent))}function y(c){return N(c.data)}return(c,p)=>{const b=fe("router-link");return q(),V("main",null,[r.value?(q(),V("h1",$t,M(r.value),1)):J("",!0),C("p",null,M(d.value?`${_.value.toLocaleString()} codes`:"Loading"),1),d.value?.length?(q(),Z(L(ge),{key:1,filters:e.value,"onUpdate:filters":p[2]||(p[2]=w=>e.value=w),first:v.value,"onUpdate:first":p[3]||(p[3]=w=>v.value=w),"always-show-paginator":!1,"global-filter-fields":["name","version","device.name","system.name"],"page-link-size":8,"paginator-template":L(i),rows:re,value:d.value,"data-key":"id",paginator:"","paginator-position":"both","selection-mode":"single",size:"small","sort-mode":"multiple",onPage:k,onRowSelect:y},{header:A(()=>[C("div",Pt,[C("span",qt,[jt,x(L(ze),{modelValue:e.value.global.value,"onUpdate:modelValue":p[0]||(p[0]=w=>e.value.global.value=w),placeholder:"Search",onBlur:k,onInput:p[1]||(p[1]=()=>v.value=0)},null,8,["modelValue"])])])]),default:A(()=>[x(L(H),{field:"name",header:"Game",sortable:!0},{body:A(w=>[x(b,{to:w.data.route,custom:""},{default:A(({href:z})=>[C("a",{class:"row-link",href:z,onClick:W=>K(W,w.data)},M(w.data.name),9,Mt)]),_:2},1032,["to"])]),_:1}),x(L(H),{field:"version",header:"Version",sortable:!0}),x(L(H),{field:"device.name",header:"Device",sortable:!0}),x(L(H),{field:"system.name",header:"System",sortable:!0}),x(L(H),{header:"Codes",class:"col-1 text-right"},{body:A(w=>[X(M(w.data.qty.toLocaleString()),1)]),_:1})]),_:1},8,["filters","first","global-filter-fields","paginator-template","value"])):J("",!0)])}}}),ke=Re({history:Ne(),routes:[{component:Ot,name:"home",path:"/",meta:{showInNav:!0}},{component:Ct,name:"system",path:"/systems/:id/:slug",props:!0},{component:Et,name:"game",path:"/systems/:systemId/:systemSlug/games/:id/:slug",props:!0},{component:()=>de(()=>import("./NotFoundView@Ve1yAmSt.js"),__vite__mapDeps([2,3,4,5]),import.meta.url),name:"not-found",path:"/:params(.*)*"}]});let ue;ke.beforeEach((n,a,t)=>{const s=n.meta;s.title&&(document.title=s.title),ue||(ue=be()),ue.popFlash(),t()});const ie=Te(at);ie.use(De());ie.use(ke);ie.use(Be);ie.mount("#app");
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./themes/viva-light@H8a1X4Aj.css","./themes/viva-dark@qyr74qbj.css","./NotFoundView@Ve1yAmSt.js","./primevue@JRHUw1Xt.js","./vue@VMVV_7_-.js","./primevue@_t5YR9K2.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}