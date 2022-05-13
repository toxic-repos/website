import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFetch } from '@vueuse/core'

import type { ListItem } from 'types'

interface State {
  loading: boolean
  rawItems: ListItem[]
}

export const useListStore = defineStore({
  id: 'list',
  state: (): State => ({
    loading: false,
    rawItems: []
  }),
  getters: {
    isLoading(state) {
      return state.loading
    },
    hasItems(state) {
      return state.rawItems.length > 0
    },
    getItemsType(state) {
      return (type: string) => {
        switch (type) {
          case 'broken_assembly':
            return state.rawItems.filter(value => value.problem_type.includes('broken_assembly'))
          case 'ddos':
            return state.rawItems.filter(value => value.problem_type.includes('ddos'))
          case 'hostile_actions':
            return state.rawItems.filter(value => value.problem_type.includes('hostile_actions'))
          case 'ip_block':
            return state.rawItems.filter(value => value.problem_type.includes('ip_block'))
          case 'malware':
            return state.rawItems.filter(value => value.problem_type.includes('malware'))
          case 'political_slogans':
            return state.rawItems.filter(value => value.problem_type.includes('political_slogans'))
          default:
            return state.rawItems
        }
      }
    },
    items(state) {
      return state.rawItems
    }
  },
  actions: {
    async loadItems(force?: boolean) {
      force ??= false

      if (this.loading || (this.rawItems.length > 0 && !force)) {
        return
      }

      await this.setLoading(true)

      const { execute, data, error } = useFetch(import.meta.env.VITE_MANIFEST_URL, { immediate: false })
        .get()
        .json()
      await execute()
      if (!error.value) {
        // sort list
        data.value.sort((a: ListItem, b: ListItem) => (a.id < b.id ? 1 : -1))

        // add protocol if not defined
        data.value.map((a: ListItem) => {
          const match = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i.exec(a.commit_link)?.[1] ?? ''
          a.commit_link = match ? a.commit_link : `https://${a.commit_link}`
          return a
        })

        await this.setItems(data.value)
      } else {
        // "Failed to fetch"
        // todo add the error handler that toasts the error
      }
      await this.setLoading(false)
    },
    async setItems(items: ListItem[]) {
      this.rawItems = items
    },
    async setLoading(value: boolean) {
      this.loading = value
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useListStore, import.meta.hot))
}
