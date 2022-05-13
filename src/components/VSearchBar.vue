<script lang="ts">
import { defineComponent, computed, ref, watch, onUnmounted } from 'vue'
import { onKeyUp, onStartTyping } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: () => ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | null>(null)
    const inputEmit = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }

    const canClear = computed(() => props.modelValue?.length > 0)

    const clear = () => {
      emit('update:modelValue', '')
    }

    onKeyUp('/', () => {
      if (!inputRef.value?.active) {
        inputRef.value?.focus()
      }
    })

    onStartTyping(() => {
      if (!inputRef.value?.active) {
        inputRef.value?.focus()
      }
    })

    watch(
      () => props.modelValue,
      v => {
        emit('update:modelValue', v)
      }
    )

    onUnmounted(() => {
      emit('update:modelValue', '')
    })

    return {
      inputRef,
      inputEmit,
      canClear,
      clear
    }
  }
})
</script>

<template>
  <div :class="$style.searchbar">
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.86105 11.2752C8.01063 11.7374 7.03598 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.55147 11.4111 8.9654 10.4447 10.0305L13.7113 13.297C14.1018 13.6876 14.1018 14.3207 13.7113 14.7113C13.3208 15.1018 12.6876 15.1018 12.2971 14.7113L8.86105 11.2752ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z"
        fill="currentColor"
      />
    </svg>
    <input
      id="search-bar"
      ref="inputRef"
      type="search"
      name="search"
      :class="$style.searchBarInput"
      maxlength="30"
      autocomplete="off"
      spellcheck="false"
      placeholder="Поиск"
      :value="modelValue"
      @input="inputEmit($event)"
    />
    <button v-if="canClear" @click="clear">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1L1 11" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" />
        <path d="M1.00001 1L11 11" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="stylus" module>
.searchbar
  position relative
  width 300px
  height 44px
  border-radius 22px
  @media (max-width: 660px)
    width 100% !important

  & > svg
    position absolute
    top 15px
    left 14px
    color currentColor

  & > input
    background-color var(--searchbar-background)
    color var(--searchbar-color)
    font-family var(--font-family)
    font-weight 500
    font-size 15px
    width 100%
    height 44px
    border var(--searchbar-border)
    border-radius 22px
    transition background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, transform 0.15s
    padding 0 34px 0 34px

    &::placeholder
      color var(--searchbar-placeholder-color)

    &:focus
      box-shadow 0 0 0 0.25rem var(--outline-color)

  & > button
    position absolute
    top 7px
    right 7px
    z-index 2
    background transparent
    color var(--searchbar-color)
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    border 0
    appearance none
    user-select none
    cursor pointer

    &::before
      z-index 0
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      display block
      background-color var(--searchbar-close-background)
      content ''
      border-radius 22px
      border var(--button-border)
      transition background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, transform .15s ease

    &:focus
      &::before
        outline 0
        box-shadow 0 0 0 0.25rem var(--outline-color)
    &:active
      &::before
        transform scale(0.97)

    & > svg
      position relative
      z-index 1
      display flex
      justify-content center
      align-items center
      gap 5px
      height 40px
</style>
