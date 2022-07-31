import Toastify from "toastify-js";
import * as FilePond from "filepond";

import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageFilter from "filepond-plugin-image-filter";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageResize from "filepond-plugin-image-resize";

// register desired plugins...
FilePond.registerPlugin(
  // validates the size of the file...
  FilePondPluginFileValidateSize,
  // validates the file type...
  FilePondPluginFileValidateType,

  // calculates & dds cropping info based on the input image dimensions and the set crop ratio...
  FilePondPluginImageCrop,
  // preview the image file type...
  FilePondPluginImagePreview,
  // filter the image file
  FilePondPluginImageFilter,
  // corrects mobile image orientation...
  FilePondPluginImageExifOrientation,
  // calculates & adds resize information...
  FilePondPluginImageResize
);
