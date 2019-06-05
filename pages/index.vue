<template>
  <div class="container">
    <h1 class="text-6xl">Hello World</h1>
    <div v-if="user">
      <button @click="$router.push({ name: 'app', query: { done: false } })">
        앱으로
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
