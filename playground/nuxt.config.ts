import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          // Apply saved theme before first paint to prevent dark/light flicker
          innerHTML: `(function(){try{var t=localStorage.getItem('byz-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          tagPosition: 'head',
        },
      ],
      title: 'Byzantium Design System',
      htmlAttrs: { lang: 'nl' },
      meta: [
        { name: 'description', content: 'Byzantium — een open-source Vue 3 design system met tokens, componenten en patronen voor moderne webapplicaties.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Syne:wght@400;500;600;700;800&family=Source+Code+Pro:ital,wght@0,400;0,500;1,400&display=swap',
        },
      ],
    },
  },

  rootDir: fileURLToPath(new URL('.', import.meta.url)),

  modules: ['@vercel/analytics/nuxt', '@vercel/speed-insights/nuxt'],

  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },

  experimental: {
    viewTransition: true,
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
    '@byzantium-design-system/core': fileURLToPath(new URL('../packages/byzantium/src', import.meta.url))
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