<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { UseDrawer } from 'types'

export default defineComponent({
  setup() {
    const drawer = inject('drawer') as UseDrawer
    return {
      drawer
    }
  }
})
</script>

<template>
  <transition
    :enter-from-class="$style.showFrom"
    :enter-active-class="$style.showActive"
    :enter-to-class="$style.showTo"
    :leave-from-class="$style.hideFrom"
    :leave-active-class="$style.hideActive"
    :leave-to-class="$style.hideTo"
  >
    <div v-show="drawer.isOpen.value" :class="$style.drawer">
      <aside :class="$style.drawerSidebar">
        <div :class="$style.drawerSidebarContent">
          <div :class="$style.drawerSidebarContentTop">
            <slot />
          </div>
          <div :class="$style.drawerSidebarContentBottom">
            <slot name="bottom" />
          </div>
        </div>
      </aside>
      <div :class="$style.drawerOverlay" @click="drawer.close"></div>
    </div>
  </transition>
</template>

<style lang="stylus" module>
.drawer
  display block
  position fixed
  z-index 100

  &__sidebar
    position fixed
    top 95px
    left 10px
    bottom 10px
    z-index 100
    display flex
    flex-direction column
    row-gap 5px
    background-color var(--drawer-background)
    border-radius 20px
    width 280px
    box-shadow 0 2px 10px rgba(#000, .2)
    padding 10px 3px

    &-content
      display flex
      overflow auto
      flex-direction column
      justify-content space-between
      row-gap 20px
      height 100%
      padding 10px
      &-top
        display flex
        flex-direction column
        row-gap 8px
      &-bottom
        display flex
        flex-direction column
        row-gap 8px


  &__overlay
    position fixed
    top 84px
    left 0
    right 0
    bottom 0
    display block
    background-color var(--drawer-overlay-background)

/* transitions */
.show-active
.hide-active
  transition opacity .1s ease-out
  pointer-events none

  .drawer
    &__sidebar
      transform-origin top left
      transition opacity .1s ease-out, transform .1s ease-out
    &__overlay
      transition opacity .1s ease-out

.show-to
.hide-from
  opacity 1

  .drawer
    &__sidebar
      opacity 1
      transform scale(1)
    &__overlay
      opacity 1
.show-from
.hide-to
  opacity 0

  .drawer
    &__sidebar
      opacity 0
      transform scale(.8)
    &__overlay
      opacity 0
</style>
