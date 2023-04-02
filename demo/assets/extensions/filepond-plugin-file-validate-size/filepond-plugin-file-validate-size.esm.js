/*!
 * FilePondPluginFileValidateSize 2.2.8
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const plugin = ({ addFilter, utils }) => {
    // get quick reference to Type utils
    const { Type, replaceInString, toNaturalFileSize } = utils;

    // filtering if an item is allowed in hopper
    addFilter('ALLOW_HOPPER_ITEM', (file, { query }) => {
        if (!query('GET_ALLOW_FILE_SIZE_VALIDATION')) {
            return true;
        }

        const sizeMax = query('GET_MAX_FILE_SIZE');
        if (sizeMax !== null && file.size > sizeMax) {
            return false;
        }

        const sizeMin = query('GET_MIN_FILE_SIZE');
        if (sizeMin !== null && file.size < sizeMin) {
            return false;
        }

        return true;
    });

    // called for each file that is loaded
    // right before it is set to the item state
    // should return a promise
    addFilter(
        'LOAD_FILE',
        (file, { query }) =>
            new Promise((resolve, reject) => {
                // if not allowed, all fine, exit
                if (!query('GET_ALLOW_FILE_SIZE_VALIDATION')) {
                    return resolve(file);
                }

                // check if file should be filtered
                const fileFilter = query('GET_FILE_VALIDATE_SIZE_FILTER');
                if (fileFilter && !fileFilter(file)) {
                    return resolve(file);
                }

                // reject or resolve based on file size
                const sizeMax = query('GET_MAX_FILE_SIZE');
                if (sizeMax !== null && file.size > sizeMax) {
                    reject({
                        status: {
                            main: query('GET_LABEL_MAX_FILE_SIZE_EXCEEDED'),
                            sub: replaceInString(query('GET_LABEL_MAX_FILE_SIZE'), {
                                filesize: toNaturalFileSize(
                                    sizeMax,
                                    '.',
                                    query('GET_FILE_SIZE_BASE'),
                                    query('GET_FILE_SIZE_LABELS', query)
                                ),
                            }),
                        },
                    });
                    return;
                }

                // reject or resolve based on file size
                const sizeMin = query('GET_MIN_FILE_SIZE');
                if (sizeMin !== null && file.size < sizeMin) {
                    reject({
                        status: {
                            main: query('GET_LABEL_MIN_FILE_SIZE_EXCEEDED'),
                            sub: replaceInString(query('GET_LABEL_MIN_FILE_SIZE'), {
                                filesize: toNaturalFileSize(
                                    sizeMin,
                                    '.',
                                    query('GET_FILE_SIZE_BASE'),
                                    query('GET_FILE_SIZE_LABELS', query)
                                ),
                            }),
                        },
                    });
                    return;
                }

                // returns the current option value
                const totalSizeMax = query('GET_MAX_TOTAL_FILE_SIZE');
                if (totalSizeMax !== null) {
                    // get the current total file size
                    const currentTotalSize = query('GET_ACTIVE_ITEMS').reduce((total, item) => {
                        return total + item.fileSize;
                    }, 0);

                    // get the size of the new file
                    if (currentTotalSize > totalSizeMax) {
                        reject({
                            status: {
                                main: query('GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED'),
                                sub: replaceInString(query('GET_LABEL_MAX_TOTAL_FILE_SIZE'), {
                                    filesize: toNaturalFileSize(
                                        totalSizeMax,
                                        '.',
                                        query('GET_FILE_SIZE_BASE'),
                                        query('GET_FILE_SIZE_LABELS', query)
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                }

                // file is fine, let's pass it back
                resolve(file);
            })
    );

    return {
        options: {
            // Enable or disable file type validation
            allowFileSizeValidation: [true, Type.BOOLEAN],

            // Max individual file size in bytes
            maxFileSize: [null, Type.INT],

            // Min individual file size in bytes
            minFileSize: [null, Type.INT],

            // Max total file size in bytes
            maxTotalFileSize: [null, Type.INT],

            // Filter the files that need to be validated for size
            fileValidateSizeFilter: [null, Type.FUNCTION],

            // error labels
            labelMinFileSizeExceeded: ['File is too small', Type.STRING],
            labelMinFileSize: ['Minimum file size is {filesize}', Type.STRING],

            labelMaxFileSizeExceeded: ['File is too large', Type.STRING],
            labelMaxFileSize: ['Maximum file size is {filesize}', Type.STRING],

            labelMaxTotalFileSizeExceeded: ['Maximum total size exceeded', Type.STRING],
            labelMaxTotalFileSize: ['Maximum total file size is {filesize}', Type.STRING],
        },
    };
};

// fire pluginloaded event if running in browser, this allows registering the plugin when using async script tags
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if (isBrowser) {
    document.dispatchEvent(new CustomEvent('FilePond:pluginloaded', { detail: plugin }));
}

export default plugin;
