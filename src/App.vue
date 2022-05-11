<script lang="ts">
import { defineComponent, provide, computed } from 'vue'
import { useFavicon, onKeyUp, useKeyModifier } from '@vueuse/core'
import { useDrawer } from 'src/composable/useDrawer'
import { useTheme } from 'src/composable/useTheme'
import VDefaultLayout from 'src/layout/VDefaultLayout.vue'

export default defineComponent({
  components: { VDefaultLayout },
  setup() {
    const drawer = useDrawer()
    provide('drawer', drawer)

    const theme = useTheme()
    provide('theme', theme)

    // change the favicon according to theme mode
    const favicon = computed(() =>
      theme.themeMode.value === 'dark' ? `${import.meta.env.VITE_BASE_URL}favicon.dark.ico` : `${import.meta.env.VITE_BASE_URL}favicon.ico`
    )
    useFavicon(favicon)

    // toggle a theme with hotkeys
    const ctrl = useKeyModifier('Control')
    const alt = useKeyModifier('Alt')
    onKeyUp('t', () => {
      if (ctrl.value && alt.value) {
        theme.themeToggle()
      }
    })
  }
})
</script>

<template>
  <v-default-layout v-if="$route.meta['layout'] === 'default'">
    <router-view />
  </v-default-layout>
  <router-view v-else />
</template>

<style src="./assets/style.styl" lang="stylus" module />
