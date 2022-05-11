<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: () => {}
    },
    title: {
      type: String,
      default: () => null
    },
    isActive: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>

<template>
  <template v-if="!href">
    <button :class="{ [$style.button]: true, [$style.buttonActive]: isActive }">
      <span :class="$style.buttonContent">
        <slot />
      </span>
    </button>
  </template>
  <template v-else>
    <a :href="href" :class="{ [$style.button]: true, [$style.buttonActive]: isActive }" :title="title" target="_blank">
      <span :class="$style.buttonContent">
        <slot />
      </span>
    </a>
  </template>
</template>

<style lang="stylus" module>
.button
  position relative
  background-color transparent
  font-family var(--font-family)
  font-size var(--button-font-size)
  color var(--button-color)
  font-weight 500
  line-height 44px
  width 100%
  height 44px
  border 0
  outline 0
  appearance none
  user-select none
  cursor pointer
  padding 0 20px
  &--active&
    color var(--primary-color)
    &::before
      background-color var(--button-focus-background)

  &::before
    z-index 0
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display block
    content ''
    background-color transparent
    border-radius 22px
    border 1px solid transparent
    transition background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, transform .15s ease

  &:focus
    &::before
      background-color var(--button-focus-background)
      outline 0
      box-shadow 0 0 0 0.25rem var(--outline-color)
  &:active
    &::before
        transform scale(0.97)

  &__content
    position relative
    z-index 1
    display flex
    justify-content flex-start
    align-items center
    gap 5px
    height 40px

    & > svg
      fill currentColor
</style>
