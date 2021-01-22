const mix = require('laravel-mix');
const sidebarItems = require('./src/sidebar-items.json');
require('laravel-mix-nunjucks')

mix.sass('src/assets/scss/app.scss', 'assets/css')
    .sass('src/assets/scss/bootstrap.scss', 'assets/css')
    .sass('src/assets/scss/pages/auth.scss', 'assets/css/pages')
    .sass('src/assets/scss/pages/error.scss', 'assets/css/pages')
    .sass('src/assets/scss/pages/email.scss', 'assets/css/pages')
    .sass('src/assets/scss/pages/chat.scss', 'assets/css/pages')
    .sass('src/assets/scss/widgets/chat.scss', 'assets/css/widgets')
    .sass('src/assets/scss/widgets/todo.scss', 'assets/css/widgets')
    .setPublicPath('dist')
    .options({
        processCssUrls: false
    });

// mix.js('node_modules/apexcharts/dist/apexcharts.min.js', 'assets/vendors/apexcharts');

mix.browserSync({
    proxy: 'mazer.test',
});

mix.njk('src/', 'dist/', {
    ext: '.html',
    marked: null,
    watch: true,
    data: {
        web_title: "Mazer Admin Dashboard",
        sidebarItems
    },
    block: 'content',
    envOptions: {
        watch: true,
        noCache: true
    },
    manageEnv: (nunjucks) => {
        nunjucks.addFilter('containString', function (str, containStr) {
            if (str == undefined) return false;
            return str.indexOf(containStr) >= 0
        })
        nunjucks.addFilter('startsWith', function (str, targetStr) {
            if (str == undefined) return false;
            return str.startsWith(targetStr)
        })
    },
})
