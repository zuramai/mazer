/*!
 * FilePondPluginImageFilter 1.0.1
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */

/* eslint-disable */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).FilePondPluginImageFilter=t()}(this,function(){"use strict";var e=function(e){var t=e.addFilter,n=e.utils.Type;return t("DID_LOAD_ITEM",function(e,t){var n=t.query;return new Promise(function(t,i){if(!function(e){return/^image/.test(e.type)}(e.file)||!n("GET_ALLOW_IMAGE_FILTER"))return t(e);var o=n("GET_IMAGE_FILTER_COLOR_MATRIX");if(!o||20!==o.length)return t(e);e.setMetadata("filter",o),t(e)})}),{options:{allowImageFilter:[!0,n.BOOLEAN],imageFilterColorMatrix:[null,n.ARRAY]}}};return"undefined"!=typeof window&&void 0!==window.document&&document.dispatchEvent(new CustomEvent("FilePond:pluginloaded",{detail:e})),e});
