import { ref, computed } from 'vue'
import type { UseDrawer } from 'types'

export function useDrawer(): UseDrawer {
  const _open = ref(false)

  const isOpen = computed(() => _open.value)

  const open = () => {
    _open.value = true
  }

  const close = () => {
    _open.value = false
  }

  const toggle = () => {
    _open.value = !_open.value
  }

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
