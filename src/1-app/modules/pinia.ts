import type { UserModule } from '../types'
import { createPinia, type Pinia } from 'pinia'

let pinia: Pinia

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app }) => {
  app.use(pinia ??= createPinia())
}
