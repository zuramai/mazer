/*!
 * FilePondPluginImageFilter 1.0.1
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

// test if file is of type image
const isImage = file => /^image/.test(file.type);

/**
 * Image Auto Filter Plugin
 */
const plugin = ({ addFilter, utils }) => {
  const { Type } = utils;

  // subscribe to file load and append required transformations
  addFilter(
    'DID_LOAD_ITEM',
    (item, { query }) =>
      new Promise((resolve, reject) => {
        // get file reference
        const file = item.file;

        // if this is not an image we do not have any business filtering it
        if (!isImage(file) || !query('GET_ALLOW_IMAGE_FILTER')) {
          // continue with the unaltered dataset
          return resolve(item);
        }

        // exit if no color matrix supplies
        const colorMatrix = query('GET_IMAGE_FILTER_COLOR_MATRIX');
        if (!colorMatrix || colorMatrix.length !== 20) return resolve(item);

        // the image needs to be filtered
        item.setMetadata('filter', colorMatrix);

        // done!
        resolve(item);
      })
  );

  // Expose plugin options
  return {
    options: {
      // Enable or disable image filtering
      allowImageFilter: [true, Type.BOOLEAN],

      // the filter to apply
      imageFilterColorMatrix: [null, Type.ARRAY]
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
