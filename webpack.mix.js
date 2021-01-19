const mix = require('laravel-mix');
const sidebarItems = require('./src/sidebar-items.json');
require('laravel-mix-nunjucks')

mix.sass('src/assets/scss/app.scss', 'assets/css')
    .sass('src/assets/scss/bootstrap.scss', 'assets/css')
    .setPublicPath('dist')
    .options({
        processCssUrls: false
    });

mix.js('node_modules/apexcharts/dist/apexcharts.min.js', 'assets/vendors/apexcharts');

mix.browserSync({
    proxy: 'mazer.test',
});
   
mix.njk('src/', 'dist/', {
    ext: '.html',
    marked: null,
    watch: true,
    data: {
        web_title: "Voler Admin Dashboard",
        sidebarItems
    },
    block: 'content',
    envOptions: {
        watch: true,
        noCache: true
    },
    manageEnv: (nunjucks) => {
       nunjucks.addFilter('containString', function(str, containStr) {
          if(str == undefined) return false;
          return str.indexOf(containStr) >= 0
       })
    },
})
