/*!
 * FilePondPluginImageExifOrientation 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const A=65496,e=65505,t=1165519206,n=18761,i=274,o=65280,a=(A,e,t=!1)=>A.getUint16(e,t),d=(A,e,t=!1)=>A.getUint32(e,t),r=(()=>"undefined"!=typeof window&&void 0!==window.document)();let s=void 0;const l=(()=>r)()?new Image:{};l.onload=(()=>s=l.naturalWidth>l.naturalHeight),l.src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";const w=({addFilter:r,utils:l})=>{const{Type:w,isFile:f}=l;return r("DID_LOAD_ITEM",(r,{query:l})=>new Promise((w,u)=>{const c=r.file;if(!(f(c)&&(A=>/^image\/jpeg/.test(A.type))(c)&&l("GET_ALLOW_IMAGE_EXIF_ORIENTATION")&&(()=>s)()))return w(r);(r=>new Promise((s,l)=>{const w=new FileReader;w.onload=function(r){const l=new DataView(r.target.result);if(a(l,0)!==A)return void s(-1);const w=l.byteLength;let f=2;for(;f<w;){const A=a(l,f);if(f+=2,A===e){if(d(l,f+=2)!==t)break;const A=a(l,f+=6)===n;f+=d(l,f+4,A);const e=a(l,f,A);f+=2;for(let t=0;t<e;t++)if(a(l,f+12*t,A)===i)return void s(a(l,f+12*t+8,A))}else{if((A&o)!==o)break;f+=a(l,f)}}s(-1)},w.readAsArrayBuffer(r.slice(0,65536))}))(c).then(A=>{r.setMetadata("exif",{orientation:A}),w(r)})})),{options:{allowImageExifOrientation:[!0,w.BOOLEAN]}}};"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:w}));export default w;
