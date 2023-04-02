/*!
 * FilePondPluginImageCrop 2.0.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const isImage = file => /^image/.test(file.type);

/**
 * Image Auto Crop Plugin
 */
const plugin = ({ addFilter, utils }) => {
  const { Type, isFile, getNumericAspectRatioFromString } = utils;

  // tests if crop is allowed on this item
  const allowCrop = (item, query) =>
    !(!isImage(item.file) || !query('GET_ALLOW_IMAGE_CROP'));

  const isObject = value => typeof value === 'object';

  const isNumber = value => typeof value === 'number';

  const updateCrop = (item, obj) =>
    item.setMetadata('crop', Object.assign({}, item.getMetadata('crop'), obj));

  // extend item methods
  addFilter('DID_CREATE_ITEM', (item, { query }) => {
    item.extend('setImageCrop', crop => {
      if (!allowCrop(item, query) || !isObject(center)) return;
      item.setMetadata('crop', crop);
      return crop;
    });

    item.extend('setImageCropCenter', center => {
      if (!allowCrop(item, query) || !isObject(center)) return;
      return updateCrop(item, { center });
    });

    item.extend('setImageCropZoom', zoom => {
      if (!allowCrop(item, query) || !isNumber(zoom)) return;
      return updateCrop(item, { zoom: Math.max(1, zoom) });
    });

    item.extend('setImageCropRotation', rotation => {
      if (!allowCrop(item, query) || !isNumber(rotation)) return;
      return updateCrop(item, { rotation });
    });

    item.extend('setImageCropFlip', flip => {
      if (!allowCrop(item, query) || !isObject(flip)) return;
      return updateCrop(item, { flip });
    });

    item.extend('setImageCropAspectRatio', newAspectRatio => {
      if (!allowCrop(item, query) || typeof newAspectRatio === 'undefined')
        return;

      const currentCrop = item.getMetadata('crop');

      const aspectRatio = getNumericAspectRatioFromString(newAspectRatio);

      const newCrop = {
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
        aspectRatio
      };

      item.setMetadata('crop', newCrop);

      return newCrop;
    });
  });

  // subscribe to file transformations
  addFilter(
    'DID_LOAD_ITEM',
    (item, { query }) =>
      new Promise((resolve, reject) => {
        // get file reference
        const file = item.file;

        // if this is not an image we do not have any business cropping it and we'll continue with the unaltered dataset
        if (!isFile(file) || !isImage(file) || !query('GET_ALLOW_IMAGE_CROP')) {
          return resolve(item);
        }

        // already has crop metadata set?
        const crop = item.getMetadata('crop');
        if (crop) {
          return resolve(item);
        }

        // get the required aspect ratio and exit if it's not set
        const humanAspectRatio = query('GET_IMAGE_CROP_ASPECT_RATIO');

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
      })
  );

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
const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
  document.dispatchEvent(
    new CustomEvent('FilePond:pluginloaded', { detail: plugin })
  );
}

export default plugin;
