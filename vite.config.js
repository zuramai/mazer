import { defineConfig } from 'vite'
import fs from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import sidebarItems from "./src/sidebar-items.json"
import horizontalMenuItems from "./src/horizontal-menu-items.json"
import { normalizePath } from 'vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = resolve(__dirname, 'src')

const getFiles = () => {
    const files = {}
    fs.readdirSync(root)
        .filter(filename => filename.endsWith('.html'))
        .forEach(filename => {
            files[filename.slice(0, -5)] = resolve(root, filename)
        })
    return files
}

const files = getFiles()

const getVariables = () => {
    const variables = {}
    Object.keys(files).forEach((filename) => {
        variables[filename + '.html'] = {
            web_title: "Mazer Admin Dashboard",
            sidebarItems,
            horizontalMenuItems,
        }
    })
    return variables
}

// Modules and extensions
const modulesToCopy = {
    "@icon/dripicons": false,
    "@fortawesome/fontawesome-free": false,
    "rater-js": false,
    "bootstrap-icons": false,
    apexcharts: true,
    "perfect-scrollbar": true,
    flatpickr: true,
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
    jsvectormap: true,
}

const copyModules = Object.keys(modulesToCopy).map(moduleName => {
    const withDist = modulesToCopy[moduleName]
    return {
        src: normalizePath(resolve(__dirname, `./node_modules/${moduleName}${withDist ? '/dist' : ''}`)),
        dest: 'assets/extensions',
        rename: moduleName
    }
})
console.log(copyModules)



export default defineConfig({
    publicDir: 'static',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: normalizePath(resolve(__dirname, './src/assets/static')), dest: 'assets' },
                { src: normalizePath(resolve(__dirname, "./node_modules/bootstrap-icons/bootstrap-icons.svg")), dest: 'assets/static/images' },
                ...copyModules
            ]
        }),
        nunjucks.default({
            templatesDir: root,
            variables: getVariables(),
            nunjucksEnvironment: {
                filters: {
                    containString: (str, containStr) => {
                        if (!str.length) return false
                        return str.indexOf(containStr) >= 0
                    },
                    startsWith: (str, targetStr) => {
                        if (!str.length) return false
                        return str.startsWith(targetStr)
                    }
                }
            }
        })
    ],
    resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
          '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
          '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
          '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
          '~@fontsource': resolve(__dirname, 'node_modules/@fontsource'),
        }
    },
    build: {
        emptyOutDir: true,
        manifest: true,
        outDir: resolve(__dirname, 'dist'),
        assetsDir:  'assets/compiled',
        rollupOptions: {
          input: files,
        },
        watch: true
    }
    // build: {
    //     outDir: 'dist',
    //     emptyOutDir: true,
    //     rollupOptions: {
    //         input: files
    //     }
    // }
})