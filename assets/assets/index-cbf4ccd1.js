import{o as c,X as _,B as g,I as j,Z as t}from"./vendor-base-cc18fcff.js";import{z as d}from"./shared-4873712f.js";const h=a=>{const{maxSize:e=5*1024*1024,onChange:r}=a,{getIntlText:o}=d();return{accept:"application/json",beforeUpload:s=>{const{name:n,size:m}=s;if((n==null?void 0:n.length)>127)return t.error(o("valid.input.name")),!1;if(!/json$/.test(s.type))return t.error(o("common.upload.error_json_format_message")),!1;if(m>e)return t.error(o("common.upload.error_json_file_size_exceed_limit",{1:Math.floor(e/(1024*1024))})),!1;const p=new FileReader;return p.readAsText(s,"utf-8"),p.onload=l=>{var i;const f=((i=l==null?void 0:l.target)==null?void 0:i.result)||"{}";let u={};try{u=JSON.parse(f)}catch(x){return console.error(x),t.error(o("common.upload.error_json_format_message")),!1}r&&r(s,u)},!1}}},y=({children:a,...e})=>{const{getIntlText:r}=d(),o=h(e);return c.jsx(_,{...o,children:a||c.jsx(g,{type:"ghost",size:"small",suffix:c.jsx(j,{type:"icon-upload"}),children:r("common.upload.upload")})})};export{y as J,h as u};