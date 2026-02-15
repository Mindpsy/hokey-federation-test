import type { UserModule } from '../types'
import { createPinia } from 'pinia'

let pinia: ReturnType<typeof createPinia>

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  app.use(pinia ??= createPinia())
}
