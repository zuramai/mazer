/*!
 * FilePondPluginImageExifOrientation 1.0.11
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self),
      (global.FilePondPluginImageExifOrientation = factory()));
})(this, function() {
  'use strict';

  // test if file is of type image
  var isJPEG = function isJPEG(file) {
    return /^image\/jpeg/.test(file.type);
  };

  var Marker = {
    JPEG: 0xffd8,
    APP1: 0xffe1,
    EXIF: 0x45786966,
    TIFF: 0x4949,
    Orientation: 0x0112,
    Unknown: 0xff00
  };

  var getUint16 = function getUint16(view, offset) {
    var little =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return view.getUint16(offset, little);
  };
  var getUint32 = function getUint32(view, offset) {
    var little =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return view.getUint32(offset, little);
  };

  var getImageOrientation = function getImageOrientation(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var view = new DataView(e.target.result);

        // Every JPEG file starts from binary value '0xFFD8'
        if (getUint16(view, 0) !== Marker.JPEG) {
          // This aint no JPEG
          resolve(-1);
          return;
        }

        var length = view.byteLength;
        var offset = 2;

        while (offset < length) {
          var marker = getUint16(view, offset);
          offset += 2;

          // There's our APP1 Marker
          if (marker === Marker.APP1) {
            if (getUint32(view, (offset += 2)) !== Marker.EXIF) {
              // no EXIF info defined
              break;
            }

            // Get TIFF Header
            var little = getUint16(view, (offset += 6)) === Marker.TIFF;
            offset += getUint32(view, offset + 4, little);

            var tags = getUint16(view, offset, little);
            offset += 2;

            for (var i = 0; i < tags; i++) {
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
  };

  var IS_BROWSER = (function() {
    return (
      typeof window !== 'undefined' && typeof window.document !== 'undefined'
    );
  })();
  var isBrowser = function isBrowser() {
    return IS_BROWSER;
  };

  // 2x1 pixel image 90CW rotated with orientation header
  var testSrc =
    'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=';

  // should correct orientation if is presented in landscape, in which case the browser doesn't autocorrect
  var shouldCorrect = undefined;
  var testImage = isBrowser() ? new Image() : {};
  testImage.onload = function() {
    return (shouldCorrect = testImage.naturalWidth > testImage.naturalHeight);
  };
  testImage.src = testSrc;

  var shouldCorrectImageExifOrientation = function shouldCorrectImageExifOrientation() {
    return shouldCorrect;
  };

  /**
   * Read Image Orientation Plugin
   */
  var plugin = function plugin(_ref) {
    var addFilter = _ref.addFilter,
      utils = _ref.utils;
    var Type = utils.Type,
      isFile = utils.isFile;

    // subscribe to file load and append required info
    addFilter('DID_LOAD_ITEM', function(item, _ref2) {
      var query = _ref2.query;
      return new Promise(function(resolve, reject) {
        // get file reference
        var file = item.file;

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
        getImageOrientation(file).then(function(orientation) {
          item.setMetadata('exif', { orientation: orientation });
          resolve(item);
        });
      });
    });

    // Expose plugin options
    return {
      options: {
        // Enable or disable image orientation reading
        allowImageExifOrientation: [true, Type.BOOLEAN]
      }
    };
  };

  // fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
  var isBrowser$1 =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';
  if (isBrowser$1) {
    document.dispatchEvent(
      new CustomEvent('FilePond:pluginloaded', { detail: plugin })
    );
  }

  return plugin;
});
