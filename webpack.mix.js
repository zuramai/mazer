const mix = require("laravel-mix");
const MixGlob = require('laravel-mix-glob');
const sidebarItems = require("./src/sidebar-items.json");
const horizontalMenuItems = require("./src/horizontal-menu-items.json");
require("laravel-mix-nunjucks");


// String constants
const assetsPath = "src/assets/";

// Create MixGlob instance
const mixGlob = new MixGlob({mix}); // mix is required


// Files loaded from css url()s will be placed alongside our resources
mix.options({
  fileLoaderDirs:  {
      fonts: 'assets/fonts',
      images: 'assets/images'
  }
});

mixGlob
  // Attention: put all generated css files directly into a subfolder
  // of assets/css. Resource loading might fail otherwise.
  .sass(`${assetsPath}scss/app.scss`, "assets/css/main")
  .sass(`${assetsPath}scss/themes/dark/app-dark.scss`, "assets/css/main")
  .sass(`${assetsPath}scss/pages/*.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/widgets/chat.scss`, "assets/css/widgets")
  .sass(`${assetsPath}scss/widgets/todo.scss`, "assets/css/widgets")
  .sass(`${assetsPath}scss/iconly.scss`, "assets/css/shared")
  .js(`${assetsPath}js/*.js`, "assets/js")
  .js(`${assetsPath}js/extensions/*.js`, "assets/js/extensions")
  .js(`${assetsPath}js/pages/*`, "assets/js/pages")

  mix.copy(
    "src/assets/images",
    "dist/assets/images"
  )
  .copy(
    "node_modules/bootstrap-icons/bootstrap-icons.svg",
    "dist/assets/images"
  )
  // TinyMCE automatically loads css and other resources from its relative path
  // so we need this hotfix to move them to the right places.
  .copy('node_modules/tinymce/skins', 'dist/assets/js/extensions/skins')
  // We place all generated css in /assets/css/xxx
  // This is the relative path to the fileLoaderDirs we specified above
  .setResourceRoot("../../../")
  .setPublicPath("dist");

mix.njk("src/*.html", "dist/", {
  ext: ".html",
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
