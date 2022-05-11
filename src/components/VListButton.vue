<template>
  <template v-if="!href">
    <button :class="$style.button">
      <span :class="$style.buttonContent">
        <slot />
      </span>
    </button>
  </template>
  <template v-else>
    <a :href="href" :class="$style.button" :title="title" target="_blank">
      <span :class="$style.buttonContent">
        <slot />
      </span>
    </a>
  </template>
</template>

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
    }
  }
})
</script>

<style lang="stylus" module>
.button
  position relative
  background-color transparent
  font-family var(--font-family)
  font-size var(--button-font-size)
  color var(--button-color)
  line-height 40px
  height 40px
  border 0
  outline 0
  appearance none
  user-select none
  cursor pointer
  padding 0 20px

  &::before
    z-index 0
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display block
    content ''
    background-color var(--button-base-background)
    border-radius 20px
    border var(--button-border)
    transition background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, transform .15s ease

  &:focus
    &::before
      background-color var(--button-focus-background)
      outline 0
      box-shadow 0 0 0 0.25rem var(--outline-color)
  &:active
    &::before
        transform scale(0.97)
  &~.button
    margin-left 5px

  &__content
    position relative
    z-index 1
    display flex
    justify-content center
    align-items center
    gap 5px
    height 40px

    & > svg
      fill currentColor
</style>
