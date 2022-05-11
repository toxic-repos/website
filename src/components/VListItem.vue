<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import VListButton from 'src/components/VListButton.vue'
import MarkJS from 'mark.js'

export default defineComponent({
  components: { VListButton },
  props: {
    id: {
      type: Number,
      default: () => -1
    },
    datetime: {
      type: String,
      default: () => ''
    },
    problemType: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    },
    commitLink: {
      type: String,
      default: () => ''
    },
    description: {
      type: String,
      default: () => ''
    },
    itemHeight: {
      type: Number,
      default: () => 0
    },
    groupByClick: {
      type: Function,
      default: () => {}
    },
    highlight: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    const descriptionRef = ref()

    let markInstance: MarkJS | null = null

    watch(
      () => props.highlight,
      async () => {
        await nextTick()
        if (markInstance != null) {
          markInstance.unmark({
            done: () => {
              markInstance?.mark(props.highlight, { separateWordSearch: false })
            }
          })
        }
      }
    )
    onMounted(() => {
      markInstance = new MarkJS(descriptionRef.value)
    })
    onUnmounted(() => {
      markInstance?.unmark()
      markInstance = null
    })

    return {
      isVisible: computed(() => true),
      descriptionRef
    }
  }
})
</script>

<template>
  <div :class="$style.item" :style="{ height: `${itemHeight}px` }">
    <!-- <div :class="$style.item"> -->
    <div :class="$style.header">
      <div :class="$style.headerLeft">
        <h2>{{ name }}</h2>
        <span>#{{ id }}</span>
      </div>
      <div :class="$style.headerRight">
        <div :class="$style.headerRightTime">
          <time :datetime="datetime">{{ datetime }}</time>
        </div>
      </div>
    </div>
    <div :class="$style.content">
      <div ref="descriptionRef" :class="$style.contentInner">
        {{ description }}
      </div>
    </div>
    <div :class="$style.footer">
      <v-list-button :class="$style.footerMore" :href="commitLink">
        <span>Источник</span>
        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5 10.6667H2.5C2.13333 10.6667 1.83333 10.3667 1.83333 10V2C1.83333 1.63333 2.13333 1.33333 2.5 1.33333H5.83333C6.2 1.33333 6.5 1.03333 6.5 0.666667C6.5 0.3 6.2 0 5.83333 0H1.83333C1.09333 0 0.5 0.6 0.5 1.33333V10.6667C0.5 11.4 1.1 12 1.83333 12H11.1667C11.9 12 12.5 11.4 12.5 10.6667V6.66667C12.5 6.3 12.2 6 11.8333 6C11.4667 6 11.1667 6.3 11.1667 6.66667V10C11.1667 10.3667 10.8667 10.6667 10.5 10.6667ZM7.83333 0.666667C7.83333 1.03333 8.13333 1.33333 8.5 1.33333H10.2267L4.14 7.42C3.88 7.68 3.88 8.1 4.14 8.36C4.4 8.62 4.82 8.62 5.08 8.36L11.1667 2.27333V4C11.1667 4.36667 11.4667 4.66667 11.8333 4.66667C12.2 4.66667 12.5 4.36667 12.5 4V0H8.5C8.13333 0 7.83333 0.3 7.83333 0.666667Z"
            fill="currentColor"
          />
        </svg>
      </v-list-button>
      <v-list-button v-if="problemType !== ''" @click="groupByClick(problemType)">{{ problemType }}</v-list-button>
    </div>
  </div>
</template>

<style lang="stylus" module>
.item
  position relative
  display flex
  background-color transparent
  flex-direction column
  justify-content flex-start
  align-items flex-start
  width 100%
  border-bottom var(--border)
  border-radius 20px
  cursor default
  transition background-color .15s ease-in-out, box-shadow .1s ease-in-out
  padding 0
  &:hover
    background-color var(--header-button-focus-background)
    outline 0
    box-shadow inset 0 0 0 0.2rem var(--outline-color)

.header
  display flex
  flex-direction row
  justify-content space-between
  align-items flex-start
  flex-wrap nowrap
  width 100%
  height 70px
  white-space nowrap
  padding 20px
  @media (max-width: 800px)
    flex-direction column

  &__left
    display flex
    flex-direction row
    justify-content flex-start
    & > h2,
    & > span
      font-size 1.25rem
      line-height 1.3
      font-weight 600

    & > h2
      overflow hidden

    & > span
      opacity 0.3
      padding-left 10px

  &__right
    display flex
    flex-direction row
    justify-content flex-end
    &-problem
      font-size 1rem
      line-height 1.5rem
      font-weight 600
    &-time
      font-size 1rem
      line-height 1.5rem
      font-weight 600
      padding-left 20px
      @media (max-width: 800px)
        padding-left 0

.content
  font-size 1rem
  line-height 1.5rem
  height 100%
  overflow overlay
  overflow-wrap anywhere
  padding 0 20px
  margin-right 5px

  &__inner
    height 100%

.footer
  display flex
  flex-direction row
  justify-content space-between
  width 100%
  height 80px
  padding 20px
  &__more
    & > span ~ svg
      margin-bottom 1px
      margin-left 8px

.description
  display flex
  justify-content center
  align-items flex-start
</style>
