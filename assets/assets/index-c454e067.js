import{n as m,Z as C,o as e,af as F,N as S,R as q,$ as J,aB as N,s as T,G as A,a8 as G,aa as k,ag as K,ab as W,i as P,ai as Y,q as Z,aC as H,P as X,B as D,c as Q}from"./vendor-base-cc18fcff.js";import{p as ee}from"./index-6524c7ed.js";import{c as U}from"./vendor-c76f9059.js";import{J as oe}from"./index-cbf4ccd1.js";import"./style-pages-42a62cad.js";import{z as j,O as te,K as se,M as re,Z as z,_ as y,$ as ne,a0 as O,a1 as ae,a2 as le,a3 as R,a4 as ce,N as ie,a5 as de,C as $,S as me,X as ue,Y as pe,p as fe,i as he}from"./shared-4873712f.js";import"./useColumns-31cfb7a0.js";import{u as ge,a as xe,M as _e}from"./usePhotoUpload-fd7bbc46.js";import"./i18n-helper-ef5bc359.js";import"./__commonjsHelpers__-23102255.js";/* empty css                     */import"./style-shared-6740825f.js";import"./useS3Upload-00eba9e8.js";const ye=({onChange:o})=>{const{getIntlText:t}=j(),[l,c]=m.useState(),[i,r]=m.useState({}),d=m.useCallback((u,s)=>{var h,a;const{configurationProfiles:p}=s;if(p!=null&&p.length&&!p.every(({version:v,values:I,form:M})=>v&&(I==null?void 0:I.length)&&M)){C.error(t("mg.product.config.error_profile_is_not_valid"));return}s.productInformation=s.productInformation||{},!((h=s.productInformation)!=null&&h.deviceType)&&l&&(s.productInformation.deviceType=l);const{deviceType:f,supportLoraClassTypes:g,defaultLoraClassType:x}=s.productInformation;f==="SUB_DEVICE"&&x&&!(g!=null&&g.includes(x))&&(s.productInformation.defaultLoraClassType=void 0),c(((a=s.productInformation)==null?void 0:a.deviceType)||""),r(s),o&&o(s,!0),C.success(t("common.upload.success"))},[l,o,t]),n=u=>{c(u),i.productInformation=i.productInformation||{},i.productInformation.deviceType=u,o&&o(i)};return e.jsx(F,{className:"ms-product-add-card-type",title:t("mg.product.config.block_title_product_type"),bordered:!1,extra:e.jsx(oe,{maxSize:10*1024*1024,onChange:d}),children:e.jsx(S,{size:"sm",className:"ms-product-type-list",children:te.map(u=>e.jsx("span",{className:U("ms-product-type-item",{active:u.value===l}),onClick:()=>n(u.key),children:t(u.labelIntlKey)},u.key))})})},je=ye,ve=[12,16],Ce=q.memo(o=>{const[t,l]=J(o);return e.jsx(S,{size:"lg",className:"ms-sn-length-select",children:ve.map(c=>e.jsx("span",{className:U("ms-sn-length-select-item",{active:t===c}),onClick:i=>l(c),children:c},c))})}),be=q.memo(o=>{const{getIntlText:t}=j(),{accept:l,fileList:c,s3UploadRequest:i,handleBeforeUpload:r,handleUploadChange:d,handleUploadRemove:n}=ge(o);return e.jsxs(S,{size:"md",className:"ms-product-config-photo-field",children:[e.jsx("div",{className:"ms-product-config-photo-upload",children:e.jsx("div",{className:"ms-product-photo-card",children:e.jsx(se,{children:e.jsx(re.SquareUpload,{className:"ms-product-config-photo-upload-select",size:"small",placement:"topLeft",showUploadList:!1,accept:l,fileList:c,s3UploadRequest:i,beforeUpload:r,onChange:d,onRemove:n})})})}),e.jsxs(S,{size:"xss",direction:"vertical",children:[e.jsx(N.Text,{type:"secondary",className:"ms-product-config-photo-label",children:t("mg.product.config.label_photo")}),e.jsx(N.Text,{type:"tertiary",children:t("mg.product.config.photo_upload_note")})]})]})}),Ie=o=>{const{getIntlText:t}=j(),{snLength:l,deviceType:c,supportLoraClassTypes:i}=o,r=c==="SUB_DEVICE",d=m.useMemo(()=>r?z.map(s=>({value:s,label:t("mg.product.info.lora_class_name",{1:s})})):[],[r,t]),n=m.useMemo(()=>r?z.map(s=>({value:s,label:t("mg.product.info.lora_class_name",{1:s}),disabled:!(i!=null&&i.includes(s))})):[],[r,i,t]);return m.useMemo(()=>[{name:"photoUrl",children:e.jsx(be,{})},{name:"name",label:t("mg.product.info.prop_name_en"),rules:[{required:!0,validator:y},...ne()],children:e.jsx(T,{})},{name:"snIdentification",label:t("mg.product.config.label_sn_identification"),rules:[{required:!0,validator:y},{validator:O},{len:4,validator:ae}],children:e.jsx(T,{})},{name:"productModel",label:t("common.label.product_model"),rules:[{required:!0,validator:y},{validator:le},{min:1,max:32,validator:R}],children:e.jsx(T,{})},{name:"snLength",label:t("mg.product.info.prop_sn_length"),rules:[{required:!0,validator:y},...ce()],children:e.jsx(Ce,{})},{hidden:!r,name:"supportLoraClassTypes",label:t("mg.product.info.prop_lora_class"),rules:[{required:!0,validator:y}],children:e.jsx(A.Group,{options:d})},{hidden:!r,name:"defaultLoraClassType",label:`${t("mg.product.info.prop_lora_class")} (${t("common.label.default")})`,rules:[{required:!0,validator:y}],children:e.jsx(G.Group,{options:n})},{name:"remark",label:t("common.label.description"),rules:ie(),children:e.jsx(T.TextArea,{showCount:!0,maxLength:1024})},{hidden:!l||l===12,name:"snAdditionalBits",label:t("mg.product.info.prop_additional_bits"),rules:[{required:!0,validator:y},{validator:O},{min:1,max:4,validator:R}],children:e.jsx(T,{})}].filter(p=>!p.hidden),[l,r,d,n,t])},Te=m.forwardRef(({data:o={},onChange:t},l)=>{const{getIntlText:c}=j(),[i,r]=m.useState(o),[d]=k.useForm(),n=Ie(i),u=(s,p)=>{const f={...o,...p},{supportLoraClassTypes:g,defaultLoraClassType:x}=f;o.deviceType==="SUB_DEVICE"&&x&&!(g!=null&&g.includes(x))&&(f.defaultLoraClassType=void 0,d.setFieldsValue({defaultLoraClassType:void 0})),r(f),t&&t(f)};return m.useEffect(()=>{r(o),d.setFieldsValue(o)},[o,d]),m.useImperativeHandle(l,()=>({getFieldsValue(...s){return d.getFieldsValue(...s)},resetFields(...s){return d.resetFields(...s)},validateFields(){return d.validateFields()}})),e.jsx(F,{className:"ms-product-add-card-info",title:c("common.label.basic_info"),bordered:!1,children:e.jsx(k,{layout:"vertical",form:d,onValuesChange:u,children:e.jsx(K,{gutter:24,children:n.map(({children:s,...p})=>{var f;return e.jsx(W,{span:p.name!=="photoUrl"?12:24,children:e.jsx(k.Item,{validateFirst:!0,...p,children:s})},(f=p.name)==null?void 0:f.toString())})})})})}),Se=Te,Ne=({data:o})=>{const{getIntlText:t}=j(),l=xe(),[c,i]=m.useState("config");return e.jsx(F,{className:U("ms-product-add-card-model",{"is-empty":!(o!=null&&o.length)}),title:t("common.label.table_title_tsl"),bordered:!1,extra:!!(o!=null&&o.length)&&e.jsx(de,{value:c,onChange:i}),children:o!=null&&o.length?e.jsxs(e.Fragment,{children:[e.jsx(me,{value:o,className:o!=null&&o.length&&c==="text"?"":"hidden"}),e.jsx(_e,{columns:l,data:o||[]})]}):e.jsx($,{size:"small",text:e.jsx(N.Text,{type:"secondary",children:t("common.placeholder.empty")})})})},Fe=Ne,Me=({data:o})=>{const{getIntlText:t}=j();return e.jsx(F,{className:"ms-product-profile-card",title:t("common.label.table_title_profile"),bordered:!1,children:P(o)?e.jsx($,{size:"small",text:e.jsx(N.Text,{type:"secondary",children:t("common.placeholder.empty")})}):e.jsxs(e.Fragment,{children:[e.jsx(Y,{showIcon:!0,type:"info",message:t("mg.product.config.block_alert_prifile_config_viewing_only")}),e.jsx(ue,{readOnly:!0,profileJson:o,schemaFormData:o==null?void 0:o.form,emptyProps:{size:"small"}})]})})},ke=Me,Je=()=>{var x;const{getIntlText:o}=j(),t=Z(),l=m.useRef(null),[c,i]=m.useState({}),[r,d]=m.useState({}),n=m.useRef(null),u=H(!P(r)),[s,p]=m.useState(!1),f=(h,a)=>{var v;n!=null&&n.current&&a&&n.current.resetFields();const b=((v=n==null?void 0:n.current)==null?void 0:v.getFieldsValue(!0))||{};i({...b,productModel:h.productModel,...h.productInformation}),d(h)},g=async()=>{var L,w,V,E,B;if(!(n!=null&&n.current))return;let h;try{h=await n.current.validateFields()}catch{l.current&&(l.current.scrollTop=0);return}const a=Q({...r,productModel:h.productModel,productInformation:{...r.productInformation||{},...h}}),{deviceType:b}=a.productInformation;switch(b){case"GATEWAY":case"COMMON":{if(!((L=a.configurationProfiles)!=null&&L.length)){const _=b==="COMMON"?"mg.product.info.type_directly_device":"mg.product.info.type_gateway";C.error(o("mg.product.config.error_profile_is_not_empty",{1:o(_)}));return}break}case"SUB_DEVICE":{if(!((w=a.thingSpecifications)!=null&&w.length)){C.error(o("mg.product.config.error_tsl_is_not_empty"));return}break}}const v=(V=a==null?void 0:a.configurationProfiles)!=null&&V.length?a.configurationProfiles.map(_=>(_.form=_.form&&JSON.stringify(_.form),_)):void 0;if(!((E=a.thingSpecifications)!=null&&E.length)&&!((B=a.configurationProfiles)!=null&&B.length)){C.error(o("mg.product.config.error_tsl_or_profile_empty_message"));return}p(!0);const[I,M]=await fe(ee.addProduct({...a.productInformation,model:a.productModel,thingSpecifications:a==null?void 0:a.thingSpecifications,configurationProfiles:v,parser:a.parser,i18n:a.i18n}));p(!1),!(I||!he(M))&&(d({}),setTimeout(()=>{t("/product",{replace:!0}),C.success(o("common.message.add_success"))},0))};return m.useEffect(()=>{u.state==="blocked"&&X.confirm({title:o("common.modal.title_leave_current_page"),content:o("common.modal.desc_leave_current_page"),onOk:()=>{u.proceed()},onCancel:()=>{u.reset()}})},[u,o]),e.jsxs(e.Fragment,{children:[e.jsx(pe,{}),e.jsxs("div",{ref:l,className:"ms-main ms-main-full ms-main-transparent ms-main-product-add",children:[e.jsx(je,{onChange:f}),e.jsx(Se,{ref:n,data:c}),e.jsx(Fe,{data:r.thingSpecifications}),e.jsx(ke,{data:(x=r.configurationProfiles)!=null&&x.length?r.configurationProfiles[0]:void 0})]}),e.jsx("div",{className:"ms-footer",children:e.jsxs(S,{size:"sm",children:[e.jsx(D,{type:"primary",loading:s,disabled:P(r),onClick:g,children:o("common.button.save")}),e.jsx(D,{type:"ghost",onClick:()=>t("/product",{replace:!0}),children:o("common.button.cancel")})]})})]})};export{Je as default};
