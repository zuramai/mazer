/*!
 * FilePondPluginImageResize 2.0.10
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

// test if file is of type image
const isImage = file => /^image/.test(file.type);

const getImageSize = (url, cb) => {
    let image = new Image();
    image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        image = null;
        cb({ width, height });
    };
    image.onerror = () => cb(null);
    image.src = url;
};

/**
 * Image Auto Resize Plugin
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

                // if this is not an image we do not have any business cropping it
                if (!isImage(file) || !query('GET_ALLOW_IMAGE_RESIZE')) {
                    // continue with the unaltered dataset
                    return resolve(item);
                }

                const mode = query('GET_IMAGE_RESIZE_MODE');
                const width = query('GET_IMAGE_RESIZE_TARGET_WIDTH');
                const height = query('GET_IMAGE_RESIZE_TARGET_HEIGHT');
                const upscale = query('GET_IMAGE_RESIZE_UPSCALE');

                // no resizing to be done
                if (width === null && height === null) return resolve(item);

                const targetWidth = width === null ? height : width;
                const targetHeight = height === null ? targetWidth : height;

                // if should not upscale, we need to determine the size of the file
                const fileURL = URL.createObjectURL(file);
                getImageSize(fileURL, size => {
                    URL.revokeObjectURL(fileURL);

                    // something went wrong
                    if (!size) return resolve(item);

                    let { width: imageWidth, height: imageHeight } = size;

                    // get exif orientation
                    const orientation = (item.getMetadata('exif') || {}).orientation || -1;

                    // swap width and height if orientation needs correcting
                    if (orientation >= 5 && orientation <= 8) {
                        [imageWidth, imageHeight] = [imageHeight, imageWidth];
                    }

                    // image is already perfect size, no transformations required
                    if (imageWidth === targetWidth && imageHeight === targetHeight)
                        return resolve(item);

                    // already contained?
                    // can't upscale image, so if already at correct scale, exit
                    if (!upscale) {
                        // covering target size
                        if (mode === 'cover') {
                            // if one of edges is smaller than target size, exit
                            if (imageWidth <= targetWidth || imageHeight <= targetHeight)
                                return resolve(item);
                        }

                        // not covering target size, if image is contained in target size, exit
                        else if (imageWidth <= targetWidth && imageHeight <= targetWidth) {
                            return resolve(item);
                        }
                    }

                    // the image needs to be resized
                    item.setMetadata('resize', {
                        mode,
                        upscale,
                        size: {
                            width: targetWidth,
                            height: targetHeight,
                        },
                    });

                    resolve(item);
                });
            })
    );

    // Expose plugin options
    return {
        options: {
            // Enable or disable image resizing
            allowImageResize: [true, Type.BOOLEAN],

            // the method of rescaling
            // - force => force set size
            // - cover => pick biggest dimension
            // - contain => pick smaller dimension
            imageResizeMode: ['cover', Type.STRING],

            // set to false to disable upscaling of image smaller than the target width / height
            imageResizeUpscale: [true, Type.BOOLEAN],

            // target width
            imageResizeTargetWidth: [null, Type.INT],

            // target height
            imageResizeTargetHeight: [null, Type.INT],
        },
    };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
    document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;
