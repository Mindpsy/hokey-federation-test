import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

import { ClientSideLayout } from 'vite-plugin-vue-layouts'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
        include: [/\.vue$/, /\.md$/],
    }),

    VueRouter({
      routesFolder: [
        {
          src: 'src/2-pages',
          filePatterns: '*/ui/**/*',
          path(filepath) {
            const prefix = 'src/2-pages/'
            return filepath.slice(filepath.indexOf(prefix) + prefix.length).replace('/ui', '')
          },
        },
      ],
      extensions: ['.vue'],
      dts: 'src/1-app/typed-router.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    ClientSideLayout({
      layoutDir: 'src/1-app/layouts',
      importMode: 'async',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        // '@vueuse/head',
        // '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink', 'definePage'],
        },
      ],
      dts: 'src/1-app/auto-imports.d.ts',
      dirs: [
        'src/6-shared/configs/composables',
      ],
      vueTemplate: true,
    }),

    // vueDevTools(),
    tailwindcss(),
  ],

  resolve: {
  // alias: {
    alias: [
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      {
        find: '~app',
        replacement: fileURLToPath(new URL('./src/1-app/index.ts', import.meta.url)),
      },
      {
        find: '~pages',
        replacement: fileURLToPath(new URL('src/2-pages', import.meta.url)),
      },
      {
        find: '~widgets',
        replacement: fileURLToPath(new URL('src/3-widgets', import.meta.url)),
      },
      {
        find: '~features',
        replacement: fileURLToPath(new URL('src/4-features', import.meta.url)),
      },
      {
        find: '~entities',
        replacement: fileURLToPath(new URL('src/5-entities', import.meta.url)),
      },
      {
        find: '~shared',
        replacement: fileURLToPath(new URL('src/6-shared', import.meta.url)),
      },
    ]
  },
})
