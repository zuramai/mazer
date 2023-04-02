/*!
 * FilePondPluginImageExifOrientation 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

// test if file is of type image
const isJPEG = file => /^image\/jpeg/.test(file.type);

const Marker = {
  JPEG: 0xffd8,
  APP1: 0xffe1,
  EXIF: 0x45786966,
  TIFF: 0x4949,
  Orientation: 0x0112,
  Unknown: 0xff00
};

const getUint16 = (view, offset, little = false) =>
  view.getUint16(offset, little);
const getUint32 = (view, offset, little = false) =>
  view.getUint32(offset, little);

const getImageOrientation = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const view = new DataView(e.target.result);

      // Every JPEG file starts from binary value '0xFFD8'
      if (getUint16(view, 0) !== Marker.JPEG) {
        // This aint no JPEG
        resolve(-1);
        return;
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = getUint16(view, offset);
        offset += 2;

        // There's our APP1 Marker
        if (marker === Marker.APP1) {
          if (getUint32(view, (offset += 2)) !== Marker.EXIF) {
            // no EXIF info defined
            break;
          }

          // Get TIFF Header
          const little = getUint16(view, (offset += 6)) === Marker.TIFF;
          offset += getUint32(view, offset + 4, little);

          const tags = getUint16(view, offset, little);
          offset += 2;

          for (let i = 0; i < tags; i++) {
            // found the orientation tag
            if (
              getUint16(view, offset + i * 12, little) === Marker.Orientation
            ) {
              resolve(getUint16(view, offset + i * 12 + 8, little));
              return;
            }
          }
        } else if ((marker & Marker.Unknown) !== Marker.Unknown) {
          // Invalid
          break;
        } else {
          offset += getUint16(view, offset);
        }
      }

      // Nothing found
      resolve(-1);
    };

    // we don't need to read the entire file to get the orientation
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  });

const IS_BROWSER = (() =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined')();
const isBrowser = () => IS_BROWSER;

// 2x1 pixel image 90CW rotated with orientation header
const testSrc =
  'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=';

// should correct orientation if is presented in landscape, in which case the browser doesn't autocorrect
let shouldCorrect = undefined;
const testImage = isBrowser() ? new Image() : {};
testImage.onload = () =>
  (shouldCorrect = testImage.naturalWidth > testImage.naturalHeight);
testImage.src = testSrc;

const shouldCorrectImageExifOrientation = () => shouldCorrect;

/**
 * Read Image Orientation Plugin
 */
const plugin = ({ addFilter, utils }) => {
  const { Type, isFile } = utils;

  // subscribe to file load and append required info
  addFilter(
    'DID_LOAD_ITEM',
    (item, { query }) =>
      new Promise((resolve, reject) => {
        // get file reference
        const file = item.file;

        // if this is not a jpeg image we are not interested
        if (
          !isFile(file) ||
          !isJPEG(file) ||
          !query('GET_ALLOW_IMAGE_EXIF_ORIENTATION') ||
          !shouldCorrectImageExifOrientation()
        ) {
          // continue with the unaltered dataset
          return resolve(item);
        }

        // get orientation from exif data
        getImageOrientation(file).then(orientation => {
          item.setMetadata('exif', { orientation });
          resolve(item);
        });
      })
  );

  // Expose plugin options
  return {
    options: {
      // Enable or disable image orientation reading
      allowImageExifOrientation: [true, Type.BOOLEAN]
    }
  };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser$1 =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser$1) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin })
  );
}

export default plugin;
