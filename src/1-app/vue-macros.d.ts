/**
 * Vue <script setup> compiler macros — available globally in SFCs.
 * Required when tsconfig "types" is set and excludes Vue's ambient declarations.
 */
import type { EmitsOptions, ObjectEmitsOptions } from 'vue'

declare global {
  function defineProps<Props = {}>(): Props
  function defineEmits<EE extends EmitsOptions = {}>(emitOptions?: EE): ObjectEmitsOptions extends EE ? EmitsOptions : EE
  function defineExpose<Exposed extends Record<string, unknown> = Record<string, unknown>>(exposed?: Exposed): void
  function withDefaults<P, D extends Partial<P>>(props: P, defaults: D): P & { [K in keyof D]: NonNullable<D[K]> }
}

export {}
