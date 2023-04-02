/*!
 * FilePondPluginImageCrop 2.0.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const e=e=>/^image/.test(e.type),t=({addFilter:t,utils:o})=>{const{Type:r,isFile:a,getNumericAspectRatioFromString:n}=o,i=(t,o)=>!(!e(t.file)||!o("GET_ALLOW_IMAGE_CROP")),p=e=>"object"==typeof e,s=e=>"number"==typeof e,c=(e,t)=>e.setMetadata("crop",Object.assign({},e.getMetadata("crop"),t));return t("DID_CREATE_ITEM",(e,{query:t})=>{e.extend("setImageCrop",o=>{if(i(e,t)&&p(center))return e.setMetadata("crop",o),o}),e.extend("setImageCropCenter",o=>{if(i(e,t)&&p(o))return c(e,{center:o})}),e.extend("setImageCropZoom",o=>{if(i(e,t)&&s(o))return c(e,{zoom:Math.max(1,o)})}),e.extend("setImageCropRotation",o=>{if(i(e,t)&&s(o))return c(e,{rotation:o})}),e.extend("setImageCropFlip",o=>{if(i(e,t)&&p(o))return c(e,{flip:o})}),e.extend("setImageCropAspectRatio",o=>{if(!i(e,t)||void 0===o)return;const r=e.getMetadata("crop"),a=n(o),p={center:{x:.5,y:.5},flip:r?Object.assign({},r.flip):{horizontal:!1,vertical:!1},rotation:0,zoom:1,aspectRatio:a};return e.setMetadata("crop",p),p})}),t("DID_LOAD_ITEM",(t,{query:o})=>new Promise((r,i)=>{const p=t.file;if(!a(p)||!e(p)||!o("GET_ALLOW_IMAGE_CROP"))return r(t);if(t.getMetadata("crop"))return r(t);const s=o("GET_IMAGE_CROP_ASPECT_RATIO");t.setMetadata("crop",{center:{x:.5,y:.5},flip:{horizontal:!1,vertical:!1},rotation:0,zoom:1,aspectRatio:s?n(s):null}),r(t)})),{options:{allowImageCrop:[!0,r.BOOLEAN],imageCropAspectRatio:[null,r.STRING]}}};"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:t}));export default t;
