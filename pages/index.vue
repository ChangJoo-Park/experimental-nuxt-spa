<template>
  <div class="container mx-auto">
    <div v-if="user">
      <nuxt-link
        :to="{ name: 'app', query: { done: false } }"
        class="hover:underline text-blue-500"
      >
        앱으로
      </nuxt-link>
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
