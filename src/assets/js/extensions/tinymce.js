import tinymce from "tinymce";

 /* Default icons are required for TinyMCE 5.3 or above */
 import 'tinymce/icons/default';

 /* A theme is also required */
 import 'tinymce/themes/silver';

 
 /* Import plugins */
 import 'tinymce/plugins/code';
 
tinymce.init({ selector: '#default' });
tinymce.init({ selector: '#dark', toolbar: 'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code', plugins: 'code' });
