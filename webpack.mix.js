const mix = require("laravel-mix")
const MixGlob = require("laravel-mix-glob")
const sidebarItems = require("./src/sidebar-items.json")
const horizontalMenuItems = require("./src/horizontal-menu-items.json")
const fs = require('fs')
require("laravel-mix-nunjucks")

// String constants
const assetsPath = "src/assets/"

// Create MixGlob instance
const mixGlob = new MixGlob({ mix }) // mix is required

// Files loaded from css url()s will be placed alongside our resources
mix.options({
  fileLoaderDirs: {
    fonts: "assets/fonts",
    images: "assets/images",
  },
})

// Modules and extensions
const modulesToCopy = {
  "@icon/dripicons": false,
  "@fortawesome/fontawesome-free": false,
  "rater-js": false,
  "bootstrap-icons": false,
  apexcharts: true,
  "perfect-scrollbar": true,
  filepond: true,
  "filepond-plugin-image-preview": true,
  "feather-icons": true,
  dragula: true,
  dayjs: false,
  "chart.js": true,
  "choices.js": false,
  parsleyjs: true,
  sweetalert2: true,
  summernote: true,
  jquery: true,
  quill: true,
  tinymce: false,
  "toastify-js": false,
  "datatables.net-bs5": false,
  "simple-datatables": true, // With dist folder = true
}
for (const mod in modulesToCopy) {
  let modulePath = `node_modules/${mod}`
  if (modulesToCopy[mod]) modulePath += "/dist"
  
  fs.mkdir(`dist/assets/extensions/${mod}`, {recursive:true}, (err) => console.log('Copying module '+mod))
  mix.copyDirectory(modulePath+'/', `dist/assets/extensions/${mod}`)
}

mixGlob
  // Attention: put all generated css files directly into a subfolder
  // of assets/css. Resource loading might fail otherwise.
  .sass(`${assetsPath}scss/app.scss`, "assets/css/main")
  .sass(`${assetsPath}scss/themes/dark/app-dark.scss`, "assets/css/main")
  .sass(`${assetsPath}scss/pages/*.scss`, "assets/css/pages")
  .sass(`${assetsPath}scss/widgets/*.scss`, "assets/css/widgets")
  .sass(`${assetsPath}scss/iconly.scss`, "assets/css/shared")
  .js(`${assetsPath}js/*.js`, "assets/js")

// Copying assets
mix
  .copy("src/assets/images", "dist/assets/images")
  .copy(
    "node_modules/bootstrap-icons/bootstrap-icons.svg",
    "dist/assets/images"
  )
  .copy(`${assetsPath}js/pages`, "dist/assets/js/pages")
  // We place all generated css in /assets/css/xxx
  // This is the relative path to the fileLoaderDirs we specified above
  .setResourceRoot("../../../")
  .setPublicPath("dist")

// Nunjucks Templating
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
      if (!str.length) return false
      return str.indexOf(containStr) >= 0
    })
    nunjucks.addFilter("startsWith", (str, targetStr) => {
      if (!str.length) return false
      return str.startsWith(targetStr)
    })
  },
})

// Browsersync
mix.browserSync({
  files: ["src/scss/*.scss", "src/**/*.html", "src/assets/js/**/*.js"],
  server: "dist",
  port: 3003,
})
