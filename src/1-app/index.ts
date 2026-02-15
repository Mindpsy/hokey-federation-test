import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes as generatedRoutes} from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

// import { routes as generatedRoutes } from 'vue-router/auto'
import type { UserModule } from './types'

// import '@unocss/reset/tailwind.css'
import './styles/main.scss'

import App from './App.vue'

// import { devtools } from '@vue/devtools'
// import "tailwindcss"
// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'development')
// devtools.connect(/* host (the default is "http://localhost"), port (the default is 8090) */)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/comands-list',
    // },
    ...setupLayouts(generatedRoutes),
  ],
})

export const app = createApp(App)
  .use(router)

const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })
Object.values(modules).forEach((module) => {
  const mod = module as { install: UserModule }
  mod.install?.({ app, router })
})