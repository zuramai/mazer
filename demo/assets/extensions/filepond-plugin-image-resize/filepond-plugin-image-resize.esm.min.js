/*!
 * FilePondPluginImageResize 2.0.10
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const e=({addFilter:e,utils:t})=>{const{Type:i}=t;return e("DID_LOAD_ITEM",(e,{query:t})=>new Promise((i,n)=>{const l=e.file;if(!(e=>/^image/.test(e.type))(l)||!t("GET_ALLOW_IMAGE_RESIZE"))return i(e);const o=t("GET_IMAGE_RESIZE_MODE"),r=t("GET_IMAGE_RESIZE_TARGET_WIDTH"),a=t("GET_IMAGE_RESIZE_TARGET_HEIGHT"),E=t("GET_IMAGE_RESIZE_UPSCALE");if(null===r&&null===a)return i(e);const u=null===r?a:r,d=null===a?u:a,s=URL.createObjectURL(l);((e,t)=>{let i=new Image;i.onload=(()=>{const e=i.naturalWidth,n=i.naturalHeight;i=null,t({width:e,height:n})}),i.onerror=(()=>t(null)),i.src=e})(s,t=>{if(URL.revokeObjectURL(s),!t)return i(e);let{width:n,height:l}=t;const r=(e.getMetadata("exif")||{}).orientation||-1;if(r>=5&&r<=8&&([n,l]=[l,n]),n===u&&l===d)return i(e);if(!E)if("cover"===o){if(n<=u||l<=d)return i(e)}else if(n<=u&&l<=u)return i(e);e.setMetadata("resize",{mode:o,upscale:E,size:{width:u,height:d}}),i(e)})})),{options:{allowImageResize:[!0,i.BOOLEAN],imageResizeMode:["cover",i.STRING],imageResizeUpscale:[!0,i.BOOLEAN],imageResizeTargetWidth:[null,i.INT],imageResizeTargetHeight:[null,i.INT]}}};"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:e}));export default e;
