import{R as H,n as u,o as n,aD as Q,T as p,an as X,h as F,aA as Z,ar as ee,p as te}from"./vendor-base-cc18fcff.js";import{B as se,z as B,n as ae,O as D,a9 as V,aa as R,ab as ne,ac as S,l as P,u as A,ad as L,ae as k,a7 as z,af as re,q as ie,J as oe}from"./shared-4873712f.js";import{s as _,a as x,b as T,c as K}from"./style-pages-42a62cad.js";import{d as le}from"./index-6524c7ed.js";import"./vendor-c76f9059.js";import"./__commonjsHelpers__-23102255.js";import"./i18n-helper-ef5bc359.js";import"./style-shared-6740825f.js";/* empty css                     */const ce=H.memo(({src:s,title:t,children:i})=>{const o=u.useMemo(()=>n.jsx("div",{className:_["product-image-wrapper"],children:n.jsx("img",{className:_["product-image"],src:s,alt:t})}),[s,t]);return n.jsx(Q,{overlayClassName:_["ms-product-image-popover"],placement:"rightTop",mouseEnterDelay:.3,title:t&&n.jsx(p,{type:"ellipsisTooltip",title:t,children:t}),content:o,getPopupContainer:r=>r.parentElement||document.body,children:i||o})}),ue=s=>{const{productName:t="",photoUrl:i="",model:o=""}=s,r=()=>{let a=`${x["product-name"]} ${x["no-cursor"]}`,e=n.jsx(p,{type:"ellipsisTooltip",title:t,children:t});return i&&(a=`${x["product-name"]}`,e=n.jsx(ce,{src:i,title:t,children:n.jsx(p,{type:"ellipsisTooltip",title:t,children:t})})),n.jsx("div",{className:a,children:e})};return n.jsxs("div",{className:x["ms-product-info"],children:[r(),n.jsx("div",{className:x["device-model"],children:n.jsx(p,{type:"ellipsisTooltip",title:o,children:o})})]})},pe=s=>{const{sn:t,devEUI:i,imei:o}=(s==null?void 0:s.record)||{},{getCSSVariableValue:r}=se(),a=u.useMemo(()=>{let e=[];return t&&(e=[...e,{type:"SN",value:t}]),i&&(e=[...e,{type:"DevEUI",value:i}]),o&&(e=[...e,{type:"IMEI",value:o}]),e},[t,i,o]);return n.jsx("div",{className:T["ms-identifier-display"],children:a.map(e=>n.jsxs("div",{className:T["item-wrapper"],children:[n.jsx(X,{color:r("--gray-2"),children:n.jsx("span",{className:T["item-wrapper__type"],children:e.type})}),n.jsx("div",{className:T["item-wrapper__value"],children:n.jsx(p,{type:"ellipsisTooltip",title:e.value,children:e.value})})]},e.type))})},de=({filteredInfo:s})=>{const{getIntlText:t}=B(),{displayTimeByTimeFormatTimezone:i}=ae(),o=u.useMemo(()=>D.map(a=>({text:t(a.labelIntlKey),value:a.value})),[t]);return{columns:u.useMemo(()=>[{title:t("common.label.status"),dataIndex:"status",key:"status",width:150,filters:[{text:t("common.label.table_filter_auto_p"),value:"auto-p",children:Object.keys(V).map(a=>{const{intlText:e}=V[a];return{text:t(e),value:a}})},{text:t("common.label.table_filter_connect"),value:"device-connect",children:Object.keys(R).map(a=>{const{intlText:e}=R[a];return{text:t(e),value:a}})}],filteredValue:s.status||null,render(a,e){return n.jsx(ne,{connectStatus:e.connectStatus,autopStatus:e.autopStatus})}},{title:t("common.label.product"),dataIndex:"product",key:"product",width:200,filteredValue:s.product||null,filterSearchType:"search",render(a,e){var d,c,h;return n.jsx(ue,{productName:(d=e==null?void 0:e.product)==null?void 0:d.showName,photoUrl:(c=e==null?void 0:e.product)==null?void 0:c.photoUrl,model:(h=e==null?void 0:e.product)==null?void 0:h.model})}},{title:t("common.label.type"),dataIndex:"deviceType",key:"deviceType",width:120,filters:o,filteredValue:s.deviceType||null,render(a,e){var h;const d=D.find(v=>{var y;return v.value===((y=e==null?void 0:e.product)==null?void 0:y.deviceType)}),c=d?t(d.labelIntlKey):(h=e==null?void 0:e.product)==null?void 0:h.deviceType;return n.jsx(p,{title:c,type:"ellipsisTooltip",children:c})}},{title:t("common.label.table_title_identifier"),dataIndex:"identifier",key:"identifier",width:160,filteredValue:s.identifier||null,filterSearchType:"search",render(a,e){return n.jsx(pe,{record:e})}},{title:t("mg.device.table_title_firmware"),dataIndex:"firmwareVersion",key:"firmwareVersion",width:70,render(a){return n.jsx(p,{type:"ellipsisTooltip",title:a,children:a})}},{title:t("common.label.table_title_tsl"),dataIndex:"tslVersion",key:"tslVersion",width:70,render(a){return n.jsx(p,{type:"ellipsisTooltip",title:a,children:a})}},{title:t("common.label.table_title_profile"),dataIndex:"profileVersion",key:"profileVersion",width:70,render(a){return n.jsx(p,{type:"ellipsisTooltip",title:a,children:a})}},{title:t("common.label.create_time"),dataIndex:"createTime",key:"createTime",width:125,render(a){const e=i(F(a).valueOf());return n.jsx(p,{type:"ellipsisTooltip",title:e,children:e})}},{title:t("mg.device.table_title_account"),dataIndex:"account",key:"account",width:180,filteredValue:s.account||null,filterSearchType:"search",render(a,e){var d,c;return n.jsx(p,{type:"ellipsisTooltip",title:(d=e==null?void 0:e.user)==null?void 0:d.email,children:(c=e==null?void 0:e.user)==null?void 0:c.email})}}],[t,i,s,o])}},me=s=>{const t={};return Array.isArray(s)&&s.forEach(i=>{i in V&&(t.autopStatus=[...t.autopStatus||[],i]),i in R&&(t.connectStatus=[...t.connectStatus||[],i])}),t},he=s=>{const t={};return s&&(t.productKeyword=s),t},ye=s=>{const t={};return s&&(t.identifierKeyword=s),t},ve=s=>{var i,o,r,a;const t={};return s===S.CN&&((i=P)!=null&&i.management)?t.baseURL=P.management:s===S.US&&((o=A)!=null&&o.management)?t.baseURL=A.management:s===S.EU&&((r=L)!=null&&r.management)?t.baseURL=L.management:s===S.SG&&((a=k)!=null&&a.management)&&(t.baseURL=k.management),t},ge=[];for(let s=0;s<26;s+=1){const t=["SUB_DEVICE","GATEWAY","COMMON"][Math.floor(Math.random()*3)],i=["DISCONNECT","ONLINE","OFFLINE"][Math.floor(Math.random()*3)],o=["DISABLE","WAITING","SUCCESS"][Math.floor(Math.random()*3)],r=()=>{const a=Math.floor(Math.random()*3);return a===0?{sn:`1234567-${s}`}:a===1?{sn:`1234567-${s}`,devEUI:`765-${s}`}:{sn:`1234567-${s}`,imei:`9999988888899999888888-${s}`}};ge.push({deviceId:`deviceId-${s}`,connectStatus:i,autopStatus:o,deviceType:t,firmwareVersion:`V1.${s}`,tslVersion:`V1.${s}`,profileVersion:`V1.${s}`,createTime:F().valueOf(),user:{userId:`userId-${s}`,email:`use-account@${s}-${s}.com`},product:{model:`VS121-${s}`,showName:`product-name-${s}`,photoUrl:"https://xsgames.co/randomusers/assets/avatars/pixel/40.jpg"},...r()})}const xe=()=>{var $,E;const{getIntlText:s}=B(),t=Z(),[i,o]=u.useState(""),[r,a]=u.useState({total:0,current:1,pageSize:10}),[e,d]=u.useState({}),[c,h]=u.useState({}),v=u.useRef(((($=t==null?void 0:t.state)==null?void 0:$.serverRegion)||"").toLowerCase()||z[0].value),y=u.useRef(((E=t==null?void 0:t.state)==null?void 0:E.userId)??void 0),{data:b,loading:G,run:j}=ee(async()=>{var M,C,O,U;const l=c.columnKey?[{property:c.columnKey,direction:c.order&&re[c.order]}]:void 0,m=me(e==null?void 0:e.status),g=he((M=e==null?void 0:e.product)==null?void 0:M[0]),I=ye((C=e==null?void 0:e.identifier)==null?void 0:C[0]),w={pageSize:r.pageSize,pageNumber:r.current,sorts:l,keyword:i,deviceTypes:e==null?void 0:e.deviceType,userId:y.current,account:(O=e==null?void 0:e.account)==null?void 0:O[0],...m,...g,...I},f=ve((U=v.current)==null?void 0:U.toUpperCase()),N=await le.getDeviceList(w,{...f});return y.current&&(y.current=void 0),ie(N)},{refreshDeps:[r.current,r.pageSize,c,e,i],onSuccess(l){a({...r,total:(l==null?void 0:l.total)||0})}}),{columns:q}=de({filteredInfo:e}),W=(l,m)=>{if(l===1&&m===10&&l===r.current&&m===r.pageSize){j();return}a({...r,current:1,pageSize:10})},J=(l,m,g)=>{const{current:I,pageSize:w}=l;a({...r,current:I,pageSize:w}),d(!m||Object.entries(m).every(([,N])=>!N)?{}:m);const f=Array.isArray(g)?g[0]:g;h(f.order?f:{})},Y=u.useMemo(()=>n.jsx("div",{className:K["toolbar-area"],children:n.jsx(te,{style:{width:128},defaultValue:v.current,options:z.map(l=>({label:s(l.labelIntlKey),value:l.value})),onChange:l=>{if(v.current=l,r.current===1&&r.pageSize===10){j();return}a({...r,current:1,pageSize:10})}})}),[s,j,r]);return n.jsx("div",{className:`ms-main ms-main-full ${K["ms-device-store"]}`,children:n.jsx(oe,{showGlobalSearch:!0,name:"table-device-store",rowKey:"deviceId",scroll:{x:"fix-content"},loading:G,pagination:r,columns:q,dataSource:b==null?void 0:b.content,onGlobalSearchChange:l=>{o(l),a({...r,current:1})},toolbarRender:Y,onRefresh:W,onChange:J})})},Ve=xe;export{Ve as default};