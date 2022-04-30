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

// Filepond: Basic
FilePond.create(document.querySelector(".basic-filepond"), {
  credits: null,
  allowImagePreview: false,
  allowMultiple: false,
  allowFileEncode: false,
  required: false,
});

// Filepond: Multiple Files
FilePond.create(document.querySelector(".multiple-files-filepond"), {
  credits: null,
  allowImagePreview: false,
  allowMultiple: true,
  allowFileEncode: false,
  required: false,
});

// Filepond: With Validation
FilePond.create(document.querySelector(".with-validation-filepond"), {
  credits: null,
  allowImagePreview: false,
  allowMultiple: true,
  allowFileEncode: false,
  required: true,
  acceptedFileTypes: ["image/png"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});

// Filepond: ImgBB with server property
FilePond.create(document.querySelector(".imgbb-filepond"), {
  credits: null,
  allowImagePreview: false,
  server: {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      // We ignore the metadata property and only send the file

      const formData = new FormData();
      formData.append(fieldName, file, file.name);

      const request = new XMLHttpRequest();
      // you can change it by your client api key
      request.open(
        "POST",
        "https://api.imgbb.com/1/upload?key=762894e2014f83c023b233b2f10395e2"
      );

      request.upload.onprogress = (e) => {
        progress(e.lengthComputable, e.loaded, e.total);
      };

      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          load(request.responseText);
        } else {
          error("oh no");
        }
      };

      request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let response = JSON.parse(this.responseText);

            Toastify({
              text: "Success uploading to imgbb! see console f12",
              duration: 3000,
              close: true,
              gravity: "bottom",
              position: "right",
              backgroundColor: "#4fbe87",
            }).showToast();

            console.log(response);
          } else {
            Toastify({
              text: "Failed uploading to imgbb! see console f12",
              duration: 3000,
              close: true,
              gravity: "bottom",
              position: "right",
              backgroundColor: "#ff0000",
            }).showToast();

            console.log("Error", this.statusText);
          }
        }
      };

      request.send(formData);
    },
  },
});

// Filepond: Image Preview
FilePond.create(document.querySelector(".image-preview-filepond"), {
  credits: null,
  allowImagePreview: true,
  allowImageFilter: false,
  allowImageExifOrientation: false,
  allowImageCrop: false,
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});

// Filepond: Image Crop
FilePond.create(document.querySelector(".image-crop-filepond"), {
  credits: null,
  allowImagePreview: true,
  allowImageFilter: false,
  allowImageExifOrientation: false,
  allowImageCrop: true,
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});

// Filepond: Image Exif Orientation
FilePond.create(document.querySelector(".image-exif-filepond"), {
  credits: null,
  allowImagePreview: true,
  allowImageFilter: false,
  allowImageExifOrientation: true,
  allowImageCrop: false,
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});

// Filepond: Image Filter
FilePond.create(document.querySelector(".image-filter-filepond"), {
  credits: null,
  allowImagePreview: true,
  allowImageFilter: true,
  allowImageExifOrientation: false,
  allowImageCrop: false,
  imageFilterColorMatrix: [
    0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114,
    0, 0, 0.0, 0.0, 0.0, 1, 0,
  ],
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});

// Filepond: Image Resize
FilePond.create(document.querySelector(".image-resize-filepond"), {
  credits: null,
  allowImagePreview: true,
  allowImageFilter: false,
  allowImageExifOrientation: false,
  allowImageCrop: false,
  allowImageResize: true,
  imageResizeTargetWidth: 200,
  imageResizeTargetHeight: 200,
  imageResizeMode: "cover",
  imageResizeUpscale: true,
  acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type);
    }),
});
