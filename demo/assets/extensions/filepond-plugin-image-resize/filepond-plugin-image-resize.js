/*!
 * FilePondPluginImageResize 2.0.10
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = global || self), (global.FilePondPluginImageResize = factory()));
})(this, function() {
    'use strict';

    // test if file is of type image
    var isImage = function isImage(file) {
        return /^image/.test(file.type);
    };

    var getImageSize = function getImageSize(url, cb) {
        var image = new Image();
        image.onload = function() {
            var width = image.naturalWidth;
            var height = image.naturalHeight;
            image = null;
            cb({ width: width, height: height });
        };
        image.onerror = function() {
            return cb(null);
        };
        image.src = url;
    };

    /**
     * Image Auto Resize Plugin
     */
    var plugin = function plugin(_ref) {
        var addFilter = _ref.addFilter,
            utils = _ref.utils;
        var Type = utils.Type;

        // subscribe to file load and append required transformations
        addFilter('DID_LOAD_ITEM', function(item, _ref2) {
            var query = _ref2.query;
            return new Promise(function(resolve, reject) {
                // get file reference
                var file = item.file;

                // if this is not an image we do not have any business cropping it
                if (!isImage(file) || !query('GET_ALLOW_IMAGE_RESIZE')) {
                    // continue with the unaltered dataset
                    return resolve(item);
                }

                var mode = query('GET_IMAGE_RESIZE_MODE');
                var width = query('GET_IMAGE_RESIZE_TARGET_WIDTH');
                var height = query('GET_IMAGE_RESIZE_TARGET_HEIGHT');
                var upscale = query('GET_IMAGE_RESIZE_UPSCALE');

                // no resizing to be done
                if (width === null && height === null) return resolve(item);

                var targetWidth = width === null ? height : width;
                var targetHeight = height === null ? targetWidth : height;

                // if should not upscale, we need to determine the size of the file
                var fileURL = URL.createObjectURL(file);
                getImageSize(fileURL, function(size) {
                    URL.revokeObjectURL(fileURL);

                    // something went wrong
                    if (!size) return resolve(item);
                    var imageWidth = size.width,
                        imageHeight = size.height;

                    // get exif orientation
                    var orientation = (item.getMetadata('exif') || {}).orientation || -1;

                    // swap width and height if orientation needs correcting
                    if (orientation >= 5 && orientation <= 8) {
                        var _ref3 = [imageHeight, imageWidth];
                        imageWidth = _ref3[0];
                        imageHeight = _ref3[1];
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
                        mode: mode,
                        upscale: upscale,
                        size: {
                            width: targetWidth,
                            height: targetHeight,
                        },
                    });

                    resolve(item);
                });
            });
        });

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
    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    if (isBrowser) {
        document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
    }

    return plugin;
});
