/*!
 * FilePondPluginFileValidateType 1.2.8
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

const plugin = ({ addFilter, utils }) => {
  // get quick reference to Type utils
  const {
    Type,
    isString,
    replaceInString,
    guesstimateMimeType,
    getExtensionFromFilename,
    getFilenameFromURL
  } = utils;

  const mimeTypeMatchesWildCard = (mimeType, wildcard) => {
    const mimeTypeGroup = (/^[^/]+/.exec(mimeType) || []).pop(); // image/png -> image
    const wildcardGroup = wildcard.slice(0, -2); // image/* -> image
    return mimeTypeGroup === wildcardGroup;
  };

  const isValidMimeType = (acceptedTypes, userInputType) =>
    acceptedTypes.some(acceptedType => {
      // accepted is wildcard mime type
      if (/\*$/.test(acceptedType)) {
        return mimeTypeMatchesWildCard(userInputType, acceptedType);
      }

      // is normal mime type
      return acceptedType === userInputType;
    });

  const getItemType = item => {
    // if the item is a url we guess the mime type by the extension
    let type = '';
    if (isString(item)) {
      const filename = getFilenameFromURL(item);
      const extension = getExtensionFromFilename(filename);
      if (extension) {
        type = guesstimateMimeType(extension);
      }
    } else {
      type = item.type;
    }

    return type;
  };

  const validateFile = (item, acceptedFileTypes, typeDetector) => {
    // no types defined, everything is allowed \o/
    if (acceptedFileTypes.length === 0) {
      return true;
    }

    // gets the item type
    const type = getItemType(item);

    // no type detector, test now
    if (!typeDetector) {
      return isValidMimeType(acceptedFileTypes, type);
    }

    // use type detector
    return new Promise((resolve, reject) => {
      typeDetector(item, type)
        .then(detectedType => {
          if (isValidMimeType(acceptedFileTypes, detectedType)) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  };

  const applyMimeTypeMap = map => acceptedFileType =>
    map[acceptedFileType] === null
      ? false
      : map[acceptedFileType] || acceptedFileType;

  // setup attribute mapping for accept
  addFilter('SET_ATTRIBUTE_TO_OPTION_MAP', map =>
    Object.assign(map, {
      accept: 'acceptedFileTypes'
    })
  );

  // filtering if an item is allowed in hopper
  addFilter('ALLOW_HOPPER_ITEM', (file, { query }) => {
    // if we are not doing file type validation exit
    if (!query('GET_ALLOW_FILE_TYPE_VALIDATION')) {
      return true;
    }

    // we validate the file against the accepted file types
    return validateFile(file, query('GET_ACCEPTED_FILE_TYPES'));
  });

  // called for each file that is loaded
  // right before it is set to the item state
  // should return a promise
  addFilter(
    'LOAD_FILE',
    (file, { query }) =>
      new Promise((resolve, reject) => {
        if (!query('GET_ALLOW_FILE_TYPE_VALIDATION')) {
          resolve(file);
          return;
        }

        const acceptedFileTypes = query('GET_ACCEPTED_FILE_TYPES');

        // custom type detector method
        const typeDetector = query('GET_FILE_VALIDATE_TYPE_DETECT_TYPE');

        // if invalid, exit here
        const validationResult = validateFile(
          file,
          acceptedFileTypes,
          typeDetector
        );

        const handleRejection = () => {
          const acceptedFileTypesMapped = acceptedFileTypes
            .map(
              applyMimeTypeMap(
                query('GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP')
              )
            )
            .filter(label => label !== false);

          const acceptedFileTypesMapped_unique = acceptedFileTypesMapped.filter(
            function(item, index) {
              return acceptedFileTypesMapped.indexOf(item) === index;
            }
          );

          reject({
            status: {
              main: query('GET_LABEL_FILE_TYPE_NOT_ALLOWED'),
              sub: replaceInString(
                query('GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES'),
                {
                  allTypes: acceptedFileTypesMapped_unique.join(', '),
                  allButLastType: acceptedFileTypesMapped_unique
                    .slice(0, -1)
                    .join(', '),
                  lastType:
                    acceptedFileTypesMapped_unique[
                      acceptedFileTypesMapped.length - 1
                    ]
                }
              )
            }
          });
        };

        // has returned new filename immidiately
        if (typeof validationResult === 'boolean') {
          if (!validationResult) {
            return handleRejection();
          }
          return resolve(file);
        }

        // is promise
        validationResult
          .then(() => {
            resolve(file);
          })
          .catch(handleRejection);
      })
  );

  // expose plugin
  return {
    // default options
    options: {
      // Enable or disable file type validation
      allowFileTypeValidation: [true, Type.BOOLEAN],

      // What file types to accept
      acceptedFileTypes: [[], Type.ARRAY],
      // - must be comma separated
      // - mime types: image/png, image/jpeg, image/gif
      // - extensions: .png, .jpg, .jpeg ( not enabled yet )
      // - wildcards: image/*

      // label to show when a type is not allowed
      labelFileTypeNotAllowed: ['File is of invalid type', Type.STRING],

      // nicer label
      fileValidateTypeLabelExpectedTypes: [
        'Expects {allButLastType} or {lastType}',
        Type.STRING
      ],

      // map mime types to extensions
      fileValidateTypeLabelExpectedTypesMap: [{}, Type.OBJECT],

      // Custom function to detect type of file
      fileValidateTypeDetectType: [null, Type.FUNCTION]
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
