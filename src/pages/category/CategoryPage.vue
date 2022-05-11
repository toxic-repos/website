<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from 'src/store/list'
import VList from 'src/components/VList.vue'
import type { UseSearchBar } from 'types'

export default defineComponent({
  components: { VList },
  props: {
    type: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const store = useListStore()
    const { input } = inject('searchBar') as UseSearchBar
    const { getItemsType, isLoading } = storeToRefs(store)

    onMounted(async () => {
      await store.loadItems()
    })

    return { input, getItemsType, isLoading }
  }
})
</script>

<template>
  <v-list :search-phrase="input" :is-loading="isLoading" :items="getItemsType(type)" />
</template>
