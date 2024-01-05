import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnpluginInjectPreload from 'unplugin-inject-preload/vite'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

const serverHost = process.env.WEB_HOST || '127.0.0.1'
const serverPort = process.env.WEB_PORT ? parseInt(process.env.WEB_PORT) : 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: /\/themes\/viva-light(?:@\w+)?\.(css)$/,
          attributes: {
            media: '(prefers-color-scheme: light)',
            rel: 'stylesheet', type: undefined, as: undefined,
          },
        },
        {
          outputMatch: /\/themes\/viva-dark(?:@\w+)?\.(css)$/,
          attributes: {
            media: 'screen and (prefers-color-scheme:dark)',
            rel: 'stylesheet', type: undefined, as: undefined,
          },
        },
      ],
      injectTo: 'custom',
    }),
    ViteMinifyPlugin({ removeComments: false }),
    vue(),
    vueJsx(),
  ],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: './out',
    target: 'esnext',
    rollupOptions: {
      external: [
        /^node:.*/,
      ],
      output: {
        assetFileNames: chunkInfo => {
          let name: string
          if (chunkInfo.name === 'index.css') {
            name = 'main'
          } else if (chunkInfo.name === 'theme.css') {
            name = 'themes/[name]'
          } else if (chunkInfo.name?.match(/\.(?:ttf|woff2?)$/i)) {
            name = 'fonts/[name]'
          } else {
            name = '[name]'
          }
          return `assets/${name}@[hash][extname]`
        },
        chunkFileNames: 'assets/[name]@[hash].js',
        entryFileNames: 'assets/main@[hash].js',
        manualChunks: id => {
          if ( ! id.includes('/node_modules/')) {
            return
          }
          if (id.match(/\/(?:@?vue|vue-.+|pinia)\//)) {
            return 'vue'
          }
          let rem: RegExpMatchArray | null = null
          if ((rem = id.match(/\/primevue\/resources\/themes\/([a-z_-]+)\//))) {
            return `themes/${rem[1]}`
          }
          if (id.match(/\/(?:primevue|primeflex)\//)) {
            return 'primevue'
          }
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '@scss': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    },
  },
  server: {
    host: serverHost,
    port: serverPort,
    strictPort: true,
  },
})
