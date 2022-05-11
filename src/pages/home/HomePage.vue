<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from 'src/store/list'
import { UseDrawer, UseSearchBar } from 'types'
import VList from 'src/components/VList.vue'

export default defineComponent({
  components: { VList },
  setup() {
    const store = useListStore()
    const drawer = inject('drawer') as UseDrawer
    const { input } = inject('searchBar') as UseSearchBar
    const { items, isLoading } = storeToRefs(store)

    const onFiltered = (v: string) => {
      input.value = v
    }

    onMounted(async () => {
      await store.loadItems()
    })

    return { drawer, input, items, isLoading, onFiltered }
  }
})
</script>

<template>
  <v-list :search-phrase="input" :is-loading="isLoading" :show-type="true" :items="items" @on-filtered="onFiltered" />
</template>
