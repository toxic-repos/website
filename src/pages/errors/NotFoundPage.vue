<script lang="ts">
import { defineComponent } from 'vue'
import VListButton from 'src/components/VListButton.vue'

export default defineComponent({
  name: 'NotFoundPage',
  components: { VListButton }
})
</script>

<template>
  <div :class="$style.page">
    <h1>404</h1>
    <v-list-button @click="$router.push('/')">На главную</v-list-button>
  </div>
</template>

<style lang="stylus" module>
.page
  display flex
  flex-direction column
  justify-content center
  align-items center
  height 100vh
  & > h1
    font-family var(--font-family)
    font-size 10em
    font-weight 500
    padding-bottom 20px
</style>
