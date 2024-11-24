import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/quest': {
        target: 'http://localhost:8095', // 后端服务地址
        changeOrigin: true, // 修改请求的 origin
        rewrite: (path) => path.replace(/^\/quest/, '/quest'), // 路径重写
      },
    },
  },
})
