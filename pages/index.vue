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
    <div v-else class="mt-4">
      <button
        class="text-2xl text-blue border shadow px-4 py-2"
        @click="$router.push('/login')"
      >
        로그인하러가기
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
