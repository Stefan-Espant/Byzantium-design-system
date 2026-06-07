import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Byzantium',
      fileName: 'byzantium'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
})
