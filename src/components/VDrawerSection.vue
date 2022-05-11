<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div :class="$style.section">
    <div :class="$style.sectionTitle">
      <slot name="title" />
    </div>
    <div :class="$style.sectionContent">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" module>
.section
  //margin-top 16px
  padding-bottom 16px
  border-bottom var(--border)

  &__title
    color var(--drawer-section-color)
    font-size 0.95em
    font-weight 500
    margin-bottom 20px
    margin-left 20px

  &__content
    display flex
    flex-direction column
    row-gap 8px

  &~.section
    padding-top 20px
    border-bottom 0
</style>
