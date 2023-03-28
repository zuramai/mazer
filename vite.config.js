import { defineConfig } from 'vite'
import fs from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks'
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
export default defineConfig({
    publicDir: 'src/assets',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: resolve(__dirname, './src/assets/static'), dest: 'dist/assets' }
            ]
        }),
        nunjucks.default({
            templatesDir: root
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
        sourcemap: true,
        manifest: true,
        outDir: resolve(__dirname, 'dist'),
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