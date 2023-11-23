import { defineConfig, normalizePath, build } from 'vite'
import fs from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import sidebarItems from "./src/sidebar-items.json"
import horizontalMenuItems from "./src/horizontal-menu-items.json"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = resolve(__dirname, 'src')

const getFiles = () => {
    let files = {}

    fs.readdirSync(root)
        .filter(filename => filename.endsWith('.html'))
        .forEach(filename => {
            files[filename.slice(0, -5)] = resolve(root, filename)
        })
    return files
}

const files = getFiles()

const getVariables = (mode) => {
    const variables = {}
    Object.keys(files).forEach((filename) => {
        if (filename.includes('layouts')) filename = `layouts/${filename}`
        variables[filename + '.html'] = {
            web_title: "Mazer Admin Dashboard",
            sidebarItems,
            horizontalMenuItems,
            isDev: mode === 'development'
        }
    })
    return variables
}

// Modules and extensions
// If the value is true, then it will copy the files inside the `dist` folders
// But if the value is false, it will copy the entire module files and folders
const modulesToCopy = {
    "@icon/dripicons": false, // With dist folder = false
    "@fortawesome/fontawesome-free": false,
    "rater-js": false,
    "bootstrap-icons": false,
    apexcharts: true,
    "perfect-scrollbar": true,
    flatpickr: true,
    filepond: true,
    "filepond-plugin-file-validate-size": true,
    "filepond-plugin-file-validate-type": true, 
    "filepond-plugin-image-crop": true,
    "filepond-plugin-image-exif-orientation": true, 
    "filepond-plugin-image-filter": true,
    "filepond-plugin-image-preview": true,
    "filepond-plugin-image-resize": true,
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
    "datatables.net": false,
    "datatables.net-bs5": false,
    "simple-datatables": true, 
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

build({
    configFile: false,
    build: {
        emptyOutDir: false,
        outDir: resolve(__dirname, 'dist/assets/compiled/js'),
        lib: {
            name: 'app',
            formats: ['umd'],
            fileName: 'app',
            entry: './src/assets/js/app.js',
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js'
            }
        }
    },
})



export default defineConfig((env) => ({
    publicDir: 'static',
    base: './',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: normalizePath(resolve(__dirname, './src/assets/static')), dest: 'assets' },
                { src: normalizePath(resolve(__dirname, './dist/assets/compiled/fonts')), dest: 'assets/compiled/css' },
                { src: normalizePath(resolve(__dirname, "./node_modules/bootstrap-icons/bootstrap-icons.svg")), dest: 'assets/static/images' },
                ...copyModules
            ],
            watch: {
                reloadPageOnChange: true
            }
        }),
        nunjucks({
            templatesDir: root,
            variables: getVariables(env.mode),
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
            '@': normalizePath(resolve(__dirname, 'src')),
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
            '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
            '~@fontsource': resolve(__dirname, 'node_modules/@fontsource'),
        }
    },
    build: {
        emptyOutDir: false,
        manifest: true,
        target: "chrome58",
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: files,
            output: {
                entryFileNames: `assets/compiled/js/[name].js`,
                chunkFileNames: `assets/compiled/js/[name].js`,

                assetFileNames: (a) => {
                    const extname = a.name.split('.')[1]
                    let folder = extname ? `${extname}/` : ''

                    // Put fonts into css folder
                    if (['woff', 'woff2', 'ttf'].includes(extname))
                        folder = 'fonts/'

                    return `assets/compiled/${folder}[name][extname]`
                }
            }
        },
    }
}))