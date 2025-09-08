import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 媒体查询适配
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          viewportWidth: 375
        }),
      ]
    }
  }
})
