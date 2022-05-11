/// <reference types="vite/client" />

import type { ComputedRef, Ref, WritableComputedRef } from 'vue'
import type { BasicColorSchema } from '@vueuse/core'

// store/list.ts
export declare interface ListItem {
  id: number
  datetime: string
  problem_type: string
  name: string
  commit_link: string
  description: string
}

// composable/useTheme/index.ts
export declare interface UseTheme {
  themeMode: WritableComputedRef<BasicColorSchema>
  themeToggle(): void
}

// composable/useDrawer/index.ts
export declare interface UseDrawer {
  isOpen: ComputedRef<boolean>
  toggle(): void
  open(): void
  close(): void
}

// composable/useSearchBar/index.ts
export declare interface UseSearchBar {
  input: Ref<string>
}
