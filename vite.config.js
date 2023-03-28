import { defineConfig } from 'vite'
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
    console.log(variables)
    return variables
}

export default defineConfig({
    publicDir: 'static',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: resolve(__dirname, './src/static'), dest: 'assets' }
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