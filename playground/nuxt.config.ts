import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },

  nitro: {
    preset: 'static'
  },

  // Forceer de build output naar de playground map
  buildDir: '.nuxt',

  css: [
    fileURLToPath(new URL('../packages/byzantium/src/styles/index.scss', import.meta.url))
  ],
  alias: {
    '@byzantium/core': fileURLToPath(new URL('../packages/byzantium/src', import.meta.url))
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
})
