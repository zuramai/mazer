import tinymce from "tinymce";

/* Default icons are required for TinyMCE 5.3 or above */
import "tinymce/icons/default";

/* A theme is also required */
import "tinymce/themes/silver";

/* Import plugins */
import "tinymce/plugins/code";

document.addEventListener("DOMContentLoaded", () => {
  console.log("initing", document.body.classList.contains("theme-dark"));

  const themeOptions = document.body.classList.contains("theme-dark")
    ? {
        skin: "oxide-dark",
        content_css: "dark",
      }
    : {
        skin: "oxide",
        content_css: "default",
      };

  tinymce.init({ selector: "#default", ...themeOptions });
  tinymce.init({
    selector: "#dark",
    toolbar:
      "undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code",
    plugins: "code",
    ...themeOptions,
  });
});
