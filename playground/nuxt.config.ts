import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon',  href: '/favicon.ico' },
      ],
    },
  },

  rootDir: fileURLToPath(new URL('.', import.meta.url)),

  modules: ['@vercel/analytics/nuxt', '@vercel/speed-insights/nuxt'],

  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },

  nitro: {
    preset: 'static',
    output: {
      dir: fileURLToPath(new URL('./.output', import.meta.url)),
      publicDir: fileURLToPath(new URL('./.output/public', import.meta.url))
    }
  },

  buildDir: fileURLToPath(new URL('./.nuxt', import.meta.url)),

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