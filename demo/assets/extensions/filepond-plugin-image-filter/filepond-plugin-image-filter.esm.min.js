/*!
 * FilePondPluginImageFilter 1.0.1
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const e=({addFilter:e,utils:t})=>{const{Type:i}=t;return e("DID_LOAD_ITEM",(e,{query:t})=>new Promise((i,n)=>{if(!(e=>/^image/.test(e.type))(e.file)||!t("GET_ALLOW_IMAGE_FILTER"))return i(e);const o=t("GET_IMAGE_FILTER_COLOR_MATRIX");if(!o||20!==o.length)return i(e);e.setMetadata("filter",o),i(e)})),{options:{allowImageFilter:[!0,i.BOOLEAN],imageFilterColorMatrix:[null,i.ARRAY]}}};"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:e}));export default e;
