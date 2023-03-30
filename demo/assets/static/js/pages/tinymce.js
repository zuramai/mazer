document.addEventListener("DOMContentLoaded", () => {
  console.log("initing", document.body.classList.contains("theme-dark"))

  const themeOptions = document.body.classList.contains("theme-dark")
    ? {
        skin: "oxide-dark",
        content_css: "dark",
      }
    : {
        skin: "oxide",
        content_css: "default",
      }

  tinymce.init({ selector: "#default", ...themeOptions })
  tinymce.init({
    selector: "#dark",
    toolbar:
      "undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code",
    plugins: "code",
    ...themeOptions,
  })
})
