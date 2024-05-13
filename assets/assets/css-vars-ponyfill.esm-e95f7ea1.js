/*!
 * css-vars-ponyfill
 * v2.4.8
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2022 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */function A(){return A=Object.assign?Object.assign.bind():function(r){for(var u=1;u<arguments.length;u++){var e=arguments[u];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o])}return r},A.apply(this,arguments)}/*!
 * get-css-data
 * v2.1.0
 * https://github.com/jhildenbiddle/get-css-data
 * (c) 2018-2022 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */function T(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e={mimeType:u.mimeType||null,onBeforeSend:u.onBeforeSend||Function.prototype,onSuccess:u.onSuccess||Function.prototype,onError:u.onError||Function.prototype,onComplete:u.onComplete||Function.prototype},o=Array.isArray(r)?r:[r],c=Array.apply(null,Array(o.length)).map(function(a){return null});function f(a){var t=typeof a=="string",s=t&&a.trim().charAt(0)==="<";return t&&!s}function n(a,t){e.onError(a,o[t],t)}function g(a,t){var s=e.onSuccess(a,o[t],t);a=s===!1?"":s||a,c[t]=a,c.indexOf(null)===-1&&e.onComplete(c)}var l=document.createElement("a");o.forEach(function(a,t){l.setAttribute("href",a),l.href=String(l.href);var s=!!(document.all&&!window.atob),m=s&&l.host.split(":")[0]!==location.host.split(":")[0];if(m){var d=l.protocol===location.protocol;if(d){var p=new XDomainRequest;p.open("GET",a),p.timeout=0,p.onprogress=Function.prototype,p.ontimeout=Function.prototype,p.onload=function(){var b=p.responseText;f(b)?g(b,t):n(p,t)},p.onerror=function(b){n(p,t)},setTimeout(function(){p.send()},0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(a,")")),n(null,t)}else{var y=new XMLHttpRequest;y.open("GET",a),e.mimeType&&y.overrideMimeType&&y.overrideMimeType(e.mimeType),e.onBeforeSend(y,a,t),y.onreadystatechange=function(){if(y.readyState===4){var b=y.responseText;y.status<400&&f(b)||y.status===0&&f(b)?g(b,t):n(y,t)}},y.send()}})}/**
 * Gets CSS data from <style> and <link> nodes (including @imports), then
 * returns data in order processed by DOM. Allows specifying nodes to
 * include/exclude and filtering CSS data using RegEx.
 *
 * @preserve
 * @param {object}   [options] The options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes.
 * @param {string}   [options.include] CSS selector matching <link> and <style>
 *                   nodes to include
 * @param {string}   [options.exclude] CSS selector matching <link> and <style>
 *                   nodes to exclude
 * @param {object}   [options.filter] Regular expression used to filter node CSS
 *                   data. Each block of CSS data is tested against the filter,
 *                   and only matching data is included.
 * @param {boolean}  [options.skipDisabled=true] Determines if disabled
 *                   stylesheets will be skipped while collecting CSS data.
 * @param {boolean}  [options.useCSSOM=false] Determines if CSS data will be
 *                   collected from a stylesheet's runtime values instead of its
 *                   text content. This is required to get accurate CSS data
 *                   when a stylesheet has been modified using the deleteRule()
 *                   or insertRule() methods because these modifications will
 *                   not be reflected in the stylesheet's text content.
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments.
 * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
 *                   1) CSS text, 2) source node reference, and 3) the source
 *                   URL as arguments.
 * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
 *                   object for inspection, 2) soure node reference, and 3) the
 *                   source URL that failed (either a <link> href or an @import)
 *                   as arguments
 * @param {function} [options.onComplete] Callback after all nodes have been
 *                   processed. Passes 1) concatenated CSS text, 2) an array of
 *                   CSS text in DOM order, and 3) an array of nodes in DOM
 *                   order as arguments.
 *
 * @example
 *
 *   getCssData({
 *     rootElement : document,
 *     include     : 'style,link[rel="stylesheet"]',
 *     exclude     : '[href="skip.css"]',
 *     filter      : /red/,
 *     skipDisabled: true,
 *     useCSSOM    : false,
 *     onBeforeSend(xhr, node, url) {
 *       // ...
 *     }
 *     onSuccess(cssText, node, url) {
 *       // ...
 *     }
 *     onError(xhr, node, url) {
 *       // ...
 *     },
 *     onComplete(cssText, cssArray, nodeArray) {
 *       // ...
 *     }
 *   });
 */function ee(r){var u={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g},e={rootElement:r.rootElement||document,include:r.include||'style,link[rel="stylesheet"]',exclude:r.exclude||null,filter:r.filter||null,skipDisabled:r.skipDisabled!==!1,useCSSOM:r.useCSSOM||!1,onBeforeSend:r.onBeforeSend||Function.prototype,onSuccess:r.onSuccess||Function.prototype,onError:r.onError||Function.prototype,onComplete:r.onComplete||Function.prototype},o=Array.apply(null,e.rootElement.querySelectorAll(e.include)).filter(function(a){return!me(a,e.exclude)}),c=Array.apply(null,Array(o.length)).map(function(a){return null});function f(){var a=c.indexOf(null)===-1;if(a){c.reduce(function(s,m,d){return m===""&&s.push(d),s},[]).reverse().forEach(function(s){return[o,c].forEach(function(m){return m.splice(s,1)})});var t=c.join("");e.onComplete(t,c,o)}}function n(a,t,s,m){var d=e.onSuccess(a,s,m);a=d!==void 0&&!d?"":d||a,l(a,s,m,function(p,y){c[t]===null&&(y.forEach(function(b){return e.onError(b.xhr,s,b.url)}),!e.filter||e.filter.test(p)?c[t]=p:c[t]="",f())})}function g(a,t){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],m={};return m.rules=(a.replace(u.cssComments,"").match(u.cssImports)||[]).filter(function(d){return s.indexOf(d)===-1}),m.urls=m.rules.map(function(d){return d.replace(u.cssImports,"$1")}),m.absoluteUrls=m.urls.map(function(d){return G(d,t)}),m.absoluteRules=m.rules.map(function(d,p){var y=m.urls[p],b=G(m.absoluteUrls[p],t);return d.replace(y,b)}),m}function l(a,t,s,m){var d=arguments.length>4&&arguments[4]!==void 0?arguments[4]:[],p=arguments.length>5&&arguments[5]!==void 0?arguments[5]:[],y=g(a,s,p);y.rules.length?T(y.absoluteUrls,{onBeforeSend:function(E,O,_){e.onBeforeSend(E,t,O)},onSuccess:function(E,O,_){var k=e.onSuccess(E,t,O);E=k===!1?"":k||E;var V=g(E,O,p);return V.rules.forEach(function(L,h){E=E.replace(L,V.absoluteRules[h])}),E},onError:function(E,O,_){d.push({xhr:E,url:O}),p.push(y.rules[_]),l(a,t,s,m,d,p)},onComplete:function(E){E.forEach(function(O,_){a=a.replace(y.rules[_],O)}),l(a,t,s,m,d,p)}}):m(a,d)}o.length?o.forEach(function(a,t){var s=a.getAttribute("href"),m=a.getAttribute("rel"),d=a.nodeName.toLowerCase()==="link"&&s&&m&&m.toLowerCase().indexOf("stylesheet")!==-1,p=e.skipDisabled===!1?!1:a.disabled,y=a.nodeName.toLowerCase()==="style";if(d&&!p){var b=s.indexOf("data:text/css")!==-1;if(b){var E=decodeURIComponent(s.substring(s.indexOf(",")+1));e.useCSSOM&&(E=Array.apply(null,a.sheet.cssRules).map(function(_){return _.cssText}).join("")),n(E,t,a,location.href)}else T(s,{mimeType:"text/css",onBeforeSend:function(k,V,L){e.onBeforeSend(k,a,V)},onSuccess:function(k,V,L){var h=G(s);n(k,t,a,h)},onError:function(k,V,L){c[t]="",e.onError(k,a,V),f()}})}else if(y&&!p){var O=a.textContent;e.useCSSOM&&(O=Array.apply(null,a.sheet.cssRules).map(function(_){return _.cssText}).join("")),n(O,t,a,location.href)}else c[t]="",f()}):e.onComplete("",[])}function G(r,u){var e=document.implementation.createHTMLDocument(""),o=e.createElement("base"),c=e.createElement("a");return e.head.appendChild(o),e.body.appendChild(c),o.href=u||document.baseURI||(document.querySelector("base")||{}).href||location.href,c.href=r,c.href}function me(r,u){var e=r.matches||r.matchesSelector||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector;return e.call(r,u)}var ae=se;function se(r,u,e){r instanceof RegExp&&(r=re(r,e)),u instanceof RegExp&&(u=re(u,e));var o=oe(r,u,e);return o&&{start:o[0],end:o[1],pre:e.slice(0,o[0]),body:e.slice(o[0]+r.length,o[1]),post:e.slice(o[1]+u.length)}}function re(r,u){var e=u.match(r);return e?e[0]:null}se.range=oe;function oe(r,u,e){var o,c,f,n,g,l=e.indexOf(r),a=e.indexOf(u,l+1),t=l;if(l>=0&&a>0){if(r===u)return[l,a];for(o=[],f=e.length;t>=0&&!g;)t==l?(o.push(t),l=e.indexOf(r,t+1)):o.length==1?g=[o.pop(),a]:(c=o.pop(),c<f&&(f=c,n=a),a=e.indexOf(u,t+1)),t=l<a&&l>=0?l:a;o.length&&(g=[f,n])}return g}function $(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e={preserveStatic:!0,removeComments:!1},o=A({},e,u),c=[];function f(i){throw new Error("CSS parse error: ".concat(i))}function n(i){var v=i.exec(r);if(v)return r=r.slice(v[0].length),v}function g(){return n(/^{\s*/)}function l(){return n(/^}/)}function a(){n(/^\s*/)}function t(){if(a(),!(r[0]!=="/"||r[1]!=="*")){for(var i=2;r[i]&&(r[i]!=="*"||r[i+1]!=="/");)i++;if(!r[i])return f("end of comment is missing");var v=r.slice(2,i);return r=r.slice(i+2),{type:"comment",comment:v}}}function s(){for(var i=[],v;v=t();)i.push(v);return o.removeComments?[]:i}function m(){for(a();r[0]==="}";)f("extra closing bracket");var i=n(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(i){var v=i[0].trim(),S,C=/\/\*/.test(v);C&&(v=v.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,""));var R=/["']\w*,\w*["']/.test(v);R&&(v=v.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,function(W){return W.replace(/,/g,"‌")}));var z=/,/.test(v);return z?S=v.split(/\s*(?![^(]*\)),\s*/):S=[v],R&&(S=S.map(function(W){return W.replace(/\u200C/g,",")})),S}}function d(){if(r[0]==="@")return j();n(/^([;\s]*)+/);var i=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,v=n(/^(\*?[-#/*\\\w.]+(\[[0-9a-z_-]+\])?)\s*/);if(v){if(v=v[0].trim(),!n(/^:\s*/))return f("property missing ':'");var S=n(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),C={type:"declaration",property:v.replace(i,""),value:S?S[0].replace(i,"").trim():""};return n(/^[;\s]*/),C}}function p(){if(!g())return f("missing '{'");for(var i,v=s();i=d();)v.push(i),v=v.concat(s());return l()?v:f("missing '}'")}function y(){a();for(var i=[],v;v=n(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)i.push(v[1]),n(/^,\s*/);if(i.length)return{type:"keyframe",values:i,declarations:p()}}function b(){var i=n(/^@([-\w]+)?keyframes\s*/);if(i){var v=i[1];if(i=n(/^([-\w]+)\s*/),!i)return f("@keyframes missing name");var S=i[1];if(!g())return f("@keyframes missing '{'");for(var C,R=s();C=y();)R.push(C),R=R.concat(s());return l()?{type:"keyframes",name:S,vendor:v,keyframes:R}:f("@keyframes missing '}'")}}function E(){var i=n(/^@page */);if(i){var v=m()||[];return{type:"page",selectors:v,declarations:p()}}}function O(){var i=n(/@(top|bottom|left|right)-(left|center|right|top|middle|bottom)-?(corner)?\s*/);if(i){var v="".concat(i[1],"-").concat(i[2])+(i[3]?"-".concat(i[3]):"");return{type:"page-margin-box",name:v,declarations:p()}}}function _(){var i=n(/^@font-face\s*/);if(i)return{type:"font-face",declarations:p()}}function k(){var i=n(/^@supports *([^{]+)/);if(i)return{type:"supports",supports:i[1].trim(),rules:U()}}function V(){var i=n(/^@host\s*/);if(i)return{type:"host",rules:U()}}function L(){var i=n(/^@media([^{]+)*/);if(i)return{type:"media",media:(i[1]||"").trim(),rules:U()}}function h(){var i=n(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(i)return{type:"custom-media",name:i[1].trim(),media:i[2].trim()}}function I(){var i=n(/^@([-\w]+)?document *([^{]+)/);if(i)return{type:"document",document:i[2].trim(),vendor:i[1]?i[1].trim():null,rules:U()}}function F(){var i=n(/^@(import|charset|namespace)\s*([^;]+);/);if(i)return{type:i[1],name:i[2].trim()}}function j(){if(a(),r[0]==="@"){var i=F()||_()||L()||b()||k()||I()||h()||V()||E()||O();if(i&&!o.preserveStatic){var v=!1;if(i.declarations)v=i.declarations.some(function(C){return/var\(/.test(C.value)});else{var S=i.keyframes||i.rules||[];v=S.some(function(C){return(C.declarations||[]).some(function(R){return/var\(/.test(R.value)})})}return v?i:{}}return i}}function x(){if(!o.preserveStatic){var i=ae("{","}",r);if(i){var v=/:(?:root|host)(?![.:#(])/.test(i.pre)&&/--\S*\s*:/.test(i.body),S=/var\(/.test(i.body);if(!v&&!S)return r=r.slice(i.end+1),{}}}var C=m()||[],R=o.preserveStatic?p():p().filter(function(z){var W=C.some(function(fe){return/:(?:root|host)(?![.:#(])/.test(fe)})&&/^--\S/.test(z.property),ce=/var\(/.test(z.value);return W||ce});return C.length||f("selector missing"),{type:"rule",selectors:C,declarations:R}}function U(i){if(!i&&!g())return f("missing '{'");for(var v,S=s();r.length&&(i||r[0]!=="}")&&(v=j()||x());)v.type&&S.push(v),S=S.concat(s());return!i&&!l()?f("missing '}'"):S}return{type:"stylesheet",stylesheet:{rules:U(!0),errors:c}}}function te(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e={parseHost:!1,store:{},onWarning:function(){}},o=A({},e,u),c=new RegExp(":".concat(o.parseHost?"host":"root","$"));return typeof r=="string"&&(r=$(r,o)),r.stylesheet.rules.forEach(function(f){f.type!=="rule"||!f.selectors.some(function(n){return c.test(n)})||f.declarations.forEach(function(n,g){var l=n.property,a=n.value;l&&l.indexOf("--")===0&&(o.store[l]=a)})}),o.store}function ie(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",e=arguments.length>2?arguments[2]:void 0,o={charset:function(n){return"@charset "+n.name+";"},comment:function(n){return n.comment.indexOf("__CSSVARSPONYFILL")===0?"/*"+n.comment+"*/":""},"custom-media":function(n){return"@custom-media "+n.name+" "+n.media+";"},declaration:function(n){return n.property+":"+n.value+";"},document:function(n){return"@"+(n.vendor||"")+"document "+n.document+"{"+c(n.rules)+"}"},"font-face":function(n){return"@font-face{"+c(n.declarations)+"}"},host:function(n){return"@host{"+c(n.rules)+"}"},import:function(n){return"@import "+n.name+";"},keyframe:function(n){return n.values.join(",")+"{"+c(n.declarations)+"}"},keyframes:function(n){return"@"+(n.vendor||"")+"keyframes "+n.name+"{"+c(n.keyframes)+"}"},media:function(n){return"@media "+n.media+"{"+c(n.rules)+"}"},namespace:function(n){return"@namespace "+n.name+";"},page:function(n){return"@page "+(n.selectors.length?n.selectors.join(", "):"")+"{"+c(n.declarations)+"}"},"page-margin-box":function(n){return"@"+n.name+"{"+c(n.declarations)+"}"},rule:function(n){var g=n.declarations;if(g.length)return n.selectors.join(",")+"{"+c(g)+"}"},supports:function(n){return"@supports "+n.supports+"{"+c(n.rules)+"}"}};function c(f){for(var n="",g=0;g<f.length;g++){var l=f[g];e&&e(l);var a=o[l.type](l);a&&(n+=a,a.length&&l.selectors&&(n+=u))}return n}return c(r.stylesheet.rules)}function ue(r,u){r.rules.forEach(function(e){if(e.rules){ue(e,u);return}if(e.keyframes){e.keyframes.forEach(function(o){o.type==="keyframe"&&u(o.declarations,e)});return}e.declarations&&u(e.declarations,r)})}var ve="--",pe="var";function de(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e={preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},o=A({},e,u);return typeof r=="string"&&(r=$(r,o)),ue(r.stylesheet,function(c,f){for(var n=0;n<c.length;n++){var g=c[n],l=g.type,a=g.property,t=g.value;if(l==="declaration"){if(!o.preserveVars&&a&&a.indexOf(ve)===0){c.splice(n,1),n--;continue}if(t.indexOf(pe+"(")!==-1){var s=H(t,o);s!==g.value&&(s=ge(s),o.preserveVars?(c.splice(n,0,{type:l,property:a,value:s}),n++):g.value=s)}}}}),ie(r)}function ge(r){var u=/calc\(([^)]+)\)/g;return(r.match(u)||[]).forEach(function(e){var o="calc".concat(e.split("calc").join(""));r=r.replace(e,o)}),r}function H(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=arguments.length>2?arguments[2]:void 0;if(r.indexOf("var(")===-1)return r;var o=ae("(",")",r);function c(n){var g=n.split(",")[0].replace(/[\s\n\t]/g,""),l=(n.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],a=Object.prototype.hasOwnProperty.call(u.variables,g)?String(u.variables[g]):void 0,t=a||(l?String(l):void 0),s=e||n;return a||u.onWarning('variable "'.concat(g,'" is undefined')),t&&t!=="undefined"&&t.length>0?H(t,u,s):"var(".concat(s,")")}if(o)if(o.pre.slice(-3)==="var"){var f=o.body.trim().length===0;return f?(u.onWarning("var() must contain a non-whitespace string"),r):o.pre.slice(0,-3)+c(o.body)+H(o.post,u)}else return o.pre+"(".concat(H(o.body,u),")")+H(o.post,u);else return r.indexOf("var(")!==-1&&u.onWarning('missing closing ")" in the value "'.concat(r,'"')),r}var Y=typeof window<"u",ne=Y&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),q={group:0,job:0},N={rootElement:Y?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onError:function(){},onWarning:function(){},onSuccess:function(){},onComplete:function(){},onFinally:function(){}},D={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDeclRules:/(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^}]*})/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::(?:root|host)(?![.:#(])[\s,]*[^{]*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},w={dom:{},job:{},user:{}},X=!1,M=null,P=0,K=null,Q=!1;/**
 * Fetches, parses, and transforms CSS custom properties from specified
 * <style> and <link> elements into static values, then appends a new <style>
 * element with static values to the DOM to provide CSS custom property
 * compatibility for legacy browsers. Also provides a single interface for
 * live updates of runtime values in both modern and legacy browsers.
 *
 * @preserve
 * @param {object}   [options] Options object
 * @param {object}   [options.rootElement=document] Root element to traverse for
 *                   <link> and <style> nodes
 * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
 *                   and <style> nodes will be processed.
 * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
 *                   matching <link re="stylesheet"> and <style> nodes to
 *                   process
 * @param {string}   [options.exclude] CSS selector matching <link
 *                   rel="stylehseet"> and <style> nodes to exclude from those
 *                   matches by options.include
 * @param {object}   [options.variables] A map of custom property name/value
 *                   pairs. Property names can omit or include the leading
 *                   double-hyphen (—), and values specified will override
 *                   previous values
 * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
 *                   only generate legacy-compatible CSS in browsers that lack
 *                   native support (i.e., legacy browsers)
 * @param {boolean}  [options.preserveStatic=true] Determines if CSS
 *                   declarations that do not reference a custom property will
 *                   be preserved in the transformed CSS
 * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
 *                   property declarations will be preserved in the transformed
 *                   CSS
 * @param {boolean}  [options.silent=false] Determines if warning and error
 *                   messages will be displayed on the console
 * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
 *                   update the DOM after processing CSS custom properties
 * @param {boolean}  [options.updateURLs=true] Determines if relative url()
 *                   paths will be converted to absolute urls in external CSS
 * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
 *                   be created that will execute the ponyfill when a <link> or
 *                   <style> DOM mutation is observed
 * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
 *                   1) the XHR object, 2) source node reference, and 3) the
 *                   source URL as arguments
 * @param {function} [options.onError] Callback after a CSS parsing error has
 *                   occurred or an XHR request has failed. Passes 1) an error
 *                   message, and 2) source node reference, 3) xhr, and 4 url as
 *                   arguments.
 * @param {function} [options.onWarning] Callback after each CSS parsing warning
 *                   has occurred. Passes 1) a warning message as an argument.
 * @param {function} [options.onSuccess] Callback after CSS data has been
 *                   collected from each node and before CSS custom properties
 *                   have been transformed. Allows modifying the CSS data before
 *                   it is transformed by returning any string value (or false
 *                   to skip). Passes 1) CSS text, 2) source node reference, and
 *                   3) the source URL as arguments.
 * @param {function} [options.onComplete] Callback after all CSS has been
 *                   processed, legacy-compatible CSS has been generated, and
 *                   (optionally) the DOM has been updated. Passes 1) a CSS
 *                   string with CSS variable values resolved, 2) an array of
 *                   output <style> node references that have been appended to
 *                   the DOM, 3) an object containing all custom properies names
 *                   and values, and 4) the ponyfill execution time in
 *                   milliseconds.
 * @param {function} [options.onFinally] Callback in modern and legacy browsers
 *                   after the ponyfill has finished all tasks. Passes 1) a
 *                   boolean indicating if the last ponyfill call resulted in a
 *                   style change, 2) a boolean indicating if the current
 *                   browser provides native support for CSS custom properties,
 *                   and 3) the ponyfill execution time in milliseconds.
 * @example
 *
 *   cssVars({
 *     rootElement   : document,
 *     shadowDOM     : false,
 *     include       : 'style,link[rel="stylesheet"]',
 *     exclude       : '',
 *     variables     : {},
 *     onlyLegacy    : true,
 *     preserveStatic: true,
 *     preserveVars  : false,
 *     silent        : false,
 *     updateDOM     : true,
 *     updateURLs    : true,
 *     watch         : false,
 *     onBeforeSend(xhr, node, url) {},
 *     onError(message, node, xhr, url) {},
 *     onWarning(message) {},
 *     onSuccess(cssText, node, url) {},
 *     onComplete(cssText, styleNode, cssVariables, benchmark) {},
 *     onFinally(hasChanged, hasNativeSupport, benchmark)
 *   });
 */function B(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},u="cssVars(): ",e=A({},N,r);function o(t,s,m,d){!e.silent&&window.console&&console.error("".concat(u).concat(t,`
`),s),e.onError(t,s,m,d)}function c(t){!e.silent&&window.console&&console.warn("".concat(u).concat(t)),e.onWarning(t)}function f(t){e.onFinally(!!t,ne,J()-e.__benchmark)}if(Y){if(e.watch){e.watch=N.watch,he(e),B(e);return}else e.watch===!1&&M&&(M.disconnect(),M=null);if(!e.__benchmark){if(X===e.rootElement){ye(r);return}var n=[].slice.call(e.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])'));if(e.__benchmark=J(),e.exclude=[M?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',"link[disabled]:not([data-cssvars])",e.exclude].filter(function(t){return t}).join(","),e.variables=Ee(e.variables),n.forEach(function(t){var s=t.nodeName.toLowerCase()==="style"&&t.__cssVars.text,m=s&&t.textContent!==t.__cssVars.text;s&&m&&(t.sheet&&(t.sheet.disabled=!1),t.setAttribute("data-cssvars",""))}),!M){var g=[].slice.call(e.rootElement.querySelectorAll('[data-cssvars="out"]'));g.forEach(function(t){var s=t.getAttribute("data-cssvars-group"),m=s?e.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(s,'"]')):null;m||t.parentNode.removeChild(t)}),P&&n.length<P&&(P=n.length,w.dom={})}}if(document.readyState!=="loading")if(ne&&e.onlyLegacy){var l=!1;if(e.updateDOM){var a=e.rootElement.host||(e.rootElement===document?document.documentElement:e.rootElement);Object.keys(e.variables).forEach(function(t){var s=e.variables[t];l=l||s!==getComputedStyle(a).getPropertyValue(t),a.style.setProperty(t,s)})}f(l)}else!Q&&(e.shadowDOM||e.rootElement.shadowRoot||e.rootElement.host)?ee({rootElement:N.rootElement,include:N.include,exclude:e.exclude,skipDisabled:!1,onSuccess:function(s,m,d){var p=(m.sheet||{}).disabled&&!m.__cssVars;return p?!1:(s=s.replace(D.cssComments,"").replace(D.cssMediaQueries,""),s=(s.match(D.cssVarDeclRules)||[]).join(""),s||!1)},onComplete:function(s,m,d){te(s,{store:w.dom,onWarning:c}),Q=!0,B(e)}}):(X=e.rootElement,ee({rootElement:e.rootElement,include:e.include,exclude:e.exclude,skipDisabled:!1,onBeforeSend:e.onBeforeSend,onError:function(s,m,d){var p=s.responseURL||le(d,location.href),y=s.statusText?"(".concat(s.statusText,")"):"Unspecified Error"+(s.status===0?" (possibly CORS related)":""),b="CSS XHR Error: ".concat(p," ").concat(s.status," ").concat(y);o(b,m,s,p)},onSuccess:function(s,m,d){var p=(m.sheet||{}).disabled&&!m.__cssVars;if(p)return!1;var y=m.nodeName.toLowerCase()==="link",b=m.nodeName.toLowerCase()==="style"&&s!==m.textContent,E=e.onSuccess(s,m,d);return s=E!==void 0&&!E?"":E||s,e.updateURLs&&(y||b)&&(s=Se(s,d)),s},onComplete:function(s,m){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],p=A({},w.dom,w.user),y=!1;if(w.job={},d.forEach(function(h,I){var F=m[I];if(h.__cssVars=h.__cssVars||{},h.__cssVars.text=F,D.cssVars.test(F))try{var j=$(F,{preserveStatic:e.preserveStatic,removeComments:!0});te(j,{parseHost:!!e.rootElement.host,store:w.dom,onWarning:c}),h.__cssVars.tree=j}catch(x){o(x.message,h)}}),A(w.job,w.dom),e.updateDOM?(A(w.user,e.variables),A(w.job,w.user)):(A(w.job,w.user,e.variables),A(p,e.variables)),y=q.job>0&&!!(Object.keys(w.job).length>Object.keys(p).length||Object.keys(p).length&&Object.keys(w.job).some(function(h){return w.job[h]!==p[h]})),y)Z(e.rootElement),B(e);else{var b=[],E=[],O=!1;if(e.updateDOM&&q.job++,d.forEach(function(h,I){var F=!h.__cssVars.tree;if(h.__cssVars.tree)try{de(h.__cssVars.tree,A({},e,{variables:w.job,onWarning:c}));var j=ie(h.__cssVars.tree);if(e.updateDOM){var x=m[I],U=D.cssVarFunc.test(x);if(h.getAttribute("data-cssvars")||h.setAttribute("data-cssvars","src"),j.length&&U){var i=h.getAttribute("data-cssvars-group")||++q.group,v=j.replace(/\s/g,""),S=e.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(i,'"]'))||document.createElement("style");O=O||D.cssKeyframes.test(j),e.preserveStatic&&h.sheet&&(h.sheet.disabled=!0),S.hasAttribute("data-cssvars")||S.setAttribute("data-cssvars","out"),v===h.textContent.replace(/\s/g,"")?(F=!0,S&&S.parentNode&&(h.removeAttribute("data-cssvars-group"),S.parentNode.removeChild(S))):v!==S.textContent.replace(/\s/g,"")&&([h,S].forEach(function(C){C.setAttribute("data-cssvars-job",q.job),C.setAttribute("data-cssvars-group",i)}),S.textContent=j,b.push(j),E.push(S),S.parentNode||h.parentNode.insertBefore(S,h.nextSibling))}}else h.textContent.replace(/\s/g,"")!==j&&b.push(j)}catch(C){o(C.message,h)}F&&h.setAttribute("data-cssvars","skip"),h.hasAttribute("data-cssvars-job")||h.setAttribute("data-cssvars-job",q.job)}),P=e.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,e.shadowDOM){for(var _=[].concat(e.rootElement).concat([].slice.call(e.rootElement.querySelectorAll("*"))),k=0,V;V=_[k];++k)if(V.shadowRoot&&V.shadowRoot.querySelector("style")){var L=A({},e,{rootElement:V.shadowRoot});B(L)}}e.updateDOM&&O&&be(e.rootElement),X=!1,e.onComplete(b.join(""),E,JSON.parse(JSON.stringify(w.job)),J()-e.__benchmark),f(E.length)}}}));else document.addEventListener("DOMContentLoaded",function t(s){B(r),document.removeEventListener("DOMContentLoaded",t)})}}B.reset=function(){q.job=0,q.group=0,X=!1,M&&(M.disconnect(),M=null),P=0,K=null,Q=!1;for(var r in w)w[r]={}};function he(r){function u(l){var a=e(l)&&l.hasAttribute("disabled"),t=(l.sheet||{}).disabled;return a||t}function e(l){var a=l.nodeName.toLowerCase()==="link"&&(l.getAttribute("rel")||"").indexOf("stylesheet")!==-1;return a}function o(l){return l.nodeName.toLowerCase()==="style"}function c(l){var a=!1;if(l.type==="attributes"&&e(l.target)&&!u(l.target)){var t=l.attributeName==="disabled",s=l.attributeName==="href",m=l.target.getAttribute("data-cssvars")==="skip",d=l.target.getAttribute("data-cssvars")==="src";t?a=!m&&!d:s&&(m?l.target.setAttribute("data-cssvars",""):d&&Z(r.rootElement,!0),a=!0)}return a}function f(l){var a=!1;if(l.type==="childList"){var t=o(l.target),s=l.target.getAttribute("data-cssvars")==="out";a=t&&!s}return a}function n(l){var a=!1;return l.type==="childList"&&(a=[].slice.call(l.addedNodes).some(function(t){var s=t.nodeType===1,m=s&&t.hasAttribute("data-cssvars"),d=o(t)&&D.cssVars.test(t.textContent),p=!m&&(e(t)||d);return p&&!u(t)})),a}function g(l){var a=!1;return l.type==="childList"&&(a=[].slice.call(l.removedNodes).some(function(t){var s=t.nodeType===1,m=s&&t.getAttribute("data-cssvars")==="out",d=s&&t.getAttribute("data-cssvars")==="src",p=d;if(d||m){var y=t.getAttribute("data-cssvars-group"),b=r.rootElement.querySelector('[data-cssvars-group="'.concat(y,'"]'));d&&Z(r.rootElement,!0),b&&b.parentNode.removeChild(b)}return p})),a}window.MutationObserver&&(M&&(M.disconnect(),M=null),M=new MutationObserver(function(l){var a=l.some(function(t){return c(t)||f(t)||n(t)||g(t)});a&&B(r)}),M.observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0}))}function ye(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;clearTimeout(K),K=setTimeout(function(){r.__benchmark=null,B(r)},u)}function be(r){var u=["animation-name","-moz-animation-name","-webkit-animation-name"].filter(function(m){return getComputedStyle(document.body)[m]})[0];if(u){for(var e=[].slice.call(r.querySelectorAll("*")),o=[],c="__CSSVARSPONYFILL-KEYFRAMES__",f=0,n=e.length;f<n;f++){var g=e[f],l=getComputedStyle(g)[u];l!=="none"&&(g.style[u]+=c,o.push(g))}document.body.offsetHeight;for(var a=0,t=o.length;a<t;a++){var s=o[a].style;s[u]=s[u].replace(c,"")}}}function Se(r,u){var e=r.replace(D.cssComments,"").match(D.cssUrls)||[];return e.forEach(function(o){var c=o.replace(D.cssUrls,"$1"),f=le(c,u);r=r.replace(o,o.replace(c,f))}),r}function Ee(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},u=/^-{2}/;return Object.keys(r).reduce(function(e,o){var c=u.test(o)?o:"--".concat(o.replace(/^-+/,""));return e[c]=r[o],e},{})}function le(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:location.href,e=document.implementation.createHTMLDocument(""),o=e.createElement("base"),c=e.createElement("a");return e.head.appendChild(o),e.body.appendChild(c),o.href=u,c.href=r,c.href}function J(){return Y&&(window.performance||{}).now?window.performance.now():new Date().getTime()}function Z(r){var u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,e=[].slice.call(r.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));e.forEach(function(o){return o.setAttribute("data-cssvars","")}),u&&(w.dom={})}export{B as default};
