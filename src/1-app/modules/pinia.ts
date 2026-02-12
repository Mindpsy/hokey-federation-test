import { createPinia } from 'pinia'

let pinia: ReturnType<typeof createPinia>

// Setup Pinia
// https://pinia.vuejs.org/
export const install = ({ app }) => {
  app.use(pinia ??= createPinia())
}
