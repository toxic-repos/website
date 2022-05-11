<script lang="ts">
import { defineComponent, computed, ref, nextTick, watch, PropType, inject } from 'vue'
import { useVirtualList, useResizeObserver } from '@vueuse/core'
import VListItem from 'src/components/VListItem.vue'
import VOctoCat from 'src/components/VOctoCat.vue'
import type { UseSearchBar, ListItem, UseTheme } from 'types'

export default defineComponent({
  components: { VOctoCat, VListItem },
  props: {
    searchPhrase: {
      type: String,
      default: () => ''
    },
    isLoading: {
      type: Boolean,
      default: () => false
    },
    showType: {
      type: Boolean,
      default: () => false
    },
    items: {
      type: Array as PropType<ListItem[]>,
      default: () => []
    }
  },
  emits: ['onFiltered'],
  setup(props, { emit }) {
    const { themeMode, themeToggle } = inject('theme') as UseTheme
    const { input } = inject('searchBar') as UseSearchBar

    const groupByClick = (value: string) => {
      emit('onFiltered', value)
    }

    const headerHeight = 84
    const headerSecondRow = 0
    const containerHeight = ref(`${window.innerHeight - headerHeight}px`)

    const el = ref(document.body)
    const itemHeight = ref(200)

    useResizeObserver(el, entries => {
      const entry = entries[0]
      const { width } = entry.contentRect
      itemHeight.value = width < 500 ? 300 : 200

      if (window.innerWidth <= 600) {
        containerHeight.value = `${window.innerHeight - headerHeight - headerSecondRow}px`
      } else {
        containerHeight.value = `${window.innerHeight - headerHeight}px`
      }
    })

    const filteredItems = computed(() => {
      if (!props.searchPhrase.length) {
        return props.items
      }
      return props.items.filter(value => {
        if (props.searchPhrase?.length > 0) {
          return (
            value.name?.toLowerCase().includes(props.searchPhrase.toLowerCase()) ||
            value.problem_type?.toLowerCase().includes(props.searchPhrase.toLowerCase()) ||
            value.commit_link?.toLowerCase().includes(props.searchPhrase.toLowerCase()) ||
            value.description?.toLowerCase().includes(props.searchPhrase.toLowerCase())
          )
        }
        return true
      })
    })
    const isEmpty = computed(() => !filteredItems.value.length)

    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(filteredItems, {
      itemHeight: itemHeight.value,
      // itemHeight: i => (filteredItems.value[i].height + 8),
      overscan: 20
    })

    watch(
      () => props.searchPhrase,
      () => {
        nextTick(() => {
          scrollTo(0)
        })
      }
    )

    return {
      themeMode,
      themeToggle,
      isEmpty,
      containerHeight,
      list,
      containerProps,
      wrapperProps,
      itemHeight,
      groupByClick,
      input
    }
  }
})
</script>

<template>
  <div v-if="isLoading" :class="$style.loading">
    <span>Загрузка...</span>
  </div>
  <div v-else-if="isEmpty" :class="$style.empty">
    <div :class="$style.emptyContent">
      <v-octo-cat :mode="themeMode" />
      <span>НЕ НАЙДЕНО</span>
    </div>
  </div>
  <div v-else :class="$style.list">
    <div v-bind="containerProps" :style="{ height: containerHeight }">
      <div v-bind="wrapperProps">
        <template v-for="{ index, data } in list" :key="index">
          <v-list-item
            :id="data.id"
            :datetime="data.datetime"
            :problem-type="showType ? data.problem_type : ''"
            :name="data.name"
            :commit-link="data.commit_link"
            :description="data.description"
            :item-height="itemHeight"
            :group-by-click="groupByClick"
            :highlight="input"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>
.list
  height 100%
  margin 0 auto

.loading
  display flex
  justify-content center
  align-items center
  font-size 1.2em
  height calc(100vh - var(--header-height))

.empty
  display flex
  justify-content center
  align-items center
  font-size 1.2em
  height calc(100vh - var(--header-height))
  &__content
    display flex
    flex-direction column
    & > span
      font-weight 500
      text-align center
      padding-top 20px
</style>
