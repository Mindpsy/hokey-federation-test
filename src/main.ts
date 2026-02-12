import { createApp } from 'vue'
import App from './1-app/App.vue'
import { devtools } from '@vue/devtools'
// import "tailwindcss"
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development')
  devtools.connect(/* host (the default is "http://localhost"), port (the default is 8090) */)

createApp(App).mount('#app')