/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_BASE_URL: string
  readonly VITE_MANIFEST_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface HTMLInputElement {
  active: boolean
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
