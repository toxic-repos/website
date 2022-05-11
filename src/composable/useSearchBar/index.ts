import { ref } from 'vue'
import type { UseSearchBar } from 'types'

export function useSearchBar(): UseSearchBar {
  const input = ref('')
  return {
    input
  }
}
