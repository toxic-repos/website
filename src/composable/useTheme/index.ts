import { useColorMode } from '@vueuse/core'
import type { UseTheme } from 'types'

/**
 * Theme
 */
export function useTheme(): UseTheme {
  const themeMode = useColorMode({
    storageKey: 'theme',
    selector: 'html',
    attribute: 'theme',
    modes: {
      light: 'light',
      dark: 'dark'
    }
  })

  const themeToggle = () => {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    themeToggle,
    themeMode
  }
}
