const mix = require("laravel-mix");
const sidebarItems = require("./src/sidebar-items.json");
const horizontalMenuItems = require("./src/horizontal-menu-items.json");

require("laravel-mix-nunjucks");
const assetsPath = "src/assets/";
mix
  .sass(`${assetsPath}scss/app.scss`, "assets/css")
  .sass(`${assetsPath}scss/pages/auth.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/error.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/email.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/chat.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/toastify.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/sweetalert2.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/pages/choices.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/widgets/chat.scss`, "assets/css/widgets")
  .sass(`${assetsPath}scss/widgets/todo.scss`, "assets/css/widgets")
  .js(`${assetsPath}js/mazer.js`, "assets/js")
  .js(`${assetsPath}js/extensions/toastify.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/sweetalert2.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/ckeditor.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/ui-apexchart.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/ui-chartjs.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/ui-todolist.js`, "assets/js/extensions")
  .js(`${assetsPath}js/extensions/form-element-select.js`, "assets/js/extensions")
  .copy(
    "node_modules/bootstrap-icons/bootstrap-icons.svg",
    "dist/assets/images"
  )
  .minify("dist/assets/js/mazer.js")
  .setPublicPath("dist");

// mix.browserSync({
//     proxy: 'mazer.test',
// });

mix.njk("src/*.html", "dist/", {
  ext: ".html",
  marked: null,
  watch: true,
  data: {
    web_title: "Mazer Admin Dashboard",
    sidebarItems,
    horizontalMenuItems,
  },
  block: "content",
  envOptions: {
    watch: true,
    noCache: true,
  },
  manageEnv: (nunjucks) => {
    nunjucks.addFilter("containString", (str, containStr) => {
      if (!str.length) return false;
      return str.indexOf(containStr) >= 0;
    });
    nunjucks.addFilter("startsWith", (str, targetStr) => {
      if (!str.length) return false;
      return str.startsWith(targetStr);
    });
  },
});
