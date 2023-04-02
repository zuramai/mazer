/*!
 * FilePondPluginImageCrop 2.0.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.FilePondPluginImageCrop = factory()));
})(this, function() {
  'use strict';

  var isImage = function isImage(file) {
    return /^image/.test(file.type);
  };

  /**
   * Image Auto Crop Plugin
   */
  var plugin = function plugin(_ref) {
    var addFilter = _ref.addFilter,
      utils = _ref.utils;
    var Type = utils.Type,
      isFile = utils.isFile,
      getNumericAspectRatioFromString = utils.getNumericAspectRatioFromString;

    // tests if crop is allowed on this item
    var allowCrop = function allowCrop(item, query) {
      return !(!isImage(item.file) || !query('GET_ALLOW_IMAGE_CROP'));
    };

    var isObject = function isObject(value) {
      return typeof value === 'object';
    };

    var isNumber = function isNumber(value) {
      return typeof value === 'number';
    };

    var updateCrop = function updateCrop(item, obj) {
      return item.setMetadata(
        'crop',
        Object.assign({}, item.getMetadata('crop'), obj)
      );
    };

    // extend item methods
    addFilter('DID_CREATE_ITEM', function(item, _ref2) {
      var query = _ref2.query;

      item.extend('setImageCrop', function(crop) {
        if (!allowCrop(item, query) || !isObject(center)) return;
        item.setMetadata('crop', crop);
        return crop;
      });

      item.extend('setImageCropCenter', function(center) {
        if (!allowCrop(item, query) || !isObject(center)) return;
        return updateCrop(item, { center: center });
      });

      item.extend('setImageCropZoom', function(zoom) {
        if (!allowCrop(item, query) || !isNumber(zoom)) return;
        return updateCrop(item, { zoom: Math.max(1, zoom) });
      });

      item.extend('setImageCropRotation', function(rotation) {
        if (!allowCrop(item, query) || !isNumber(rotation)) return;
        return updateCrop(item, { rotation: rotation });
      });

      item.extend('setImageCropFlip', function(flip) {
        if (!allowCrop(item, query) || !isObject(flip)) return;
        return updateCrop(item, { flip: flip });
      });

      item.extend('setImageCropAspectRatio', function(newAspectRatio) {
        if (!allowCrop(item, query) || typeof newAspectRatio === 'undefined')
          return;

        var currentCrop = item.getMetadata('crop');

        var aspectRatio = getNumericAspectRatioFromString(newAspectRatio);

        var newCrop = {
          center: {
            x: 0.5,
            y: 0.5
          },

          flip: currentCrop
            ? Object.assign({}, currentCrop.flip)
            : {
                horizontal: false,
                vertical: false
              },

          rotation: 0,
          zoom: 1,
          aspectRatio: aspectRatio
        };

        item.setMetadata('crop', newCrop);

        return newCrop;
      });
    });

    // subscribe to file transformations
    addFilter('DID_LOAD_ITEM', function(item, _ref3) {
      var query = _ref3.query;
      return new Promise(function(resolve, reject) {
        // get file reference
        var file = item.file;

        // if this is not an image we do not have any business cropping it and we'll continue with the unaltered dataset
        if (!isFile(file) || !isImage(file) || !query('GET_ALLOW_IMAGE_CROP')) {
          return resolve(item);
        }

        // already has crop metadata set?
        var crop = item.getMetadata('crop');
        if (crop) {
          return resolve(item);
        }

        // get the required aspect ratio and exit if it's not set
        var humanAspectRatio = query('GET_IMAGE_CROP_ASPECT_RATIO');

        // set default crop rectangle
        item.setMetadata('crop', {
          center: {
            x: 0.5,
            y: 0.5
          },

          flip: {
            horizontal: false,
            vertical: false
          },

          rotation: 0,
          zoom: 1,
          aspectRatio: humanAspectRatio
            ? getNumericAspectRatioFromString(humanAspectRatio)
            : null
        });

        // we done!
        resolve(item);
      });
    });

    // Expose plugin options
    return {
      options: {
        // enable or disable image cropping
        allowImageCrop: [true, Type.BOOLEAN],

        // the aspect ratio of the crop ('1:1', '16:9', etc)
        imageCropAspectRatio: [null, Type.STRING]
      }
    };
  };

  // fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
  var isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';
  if (isBrowser) {
    document.dispatchEvent(
      new CustomEvent('FilePond:pluginloaded', { detail: plugin })
    );
  }

  return plugin;
});
