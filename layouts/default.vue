<template>
  <div class="mb-4">
    <div v-if="user">
      <div>{{ user.username }}</div>
    </div>
    <div v-else>
      <button @click="$router.push({ name: 'login' })">Login</button>
      <button @click="$router.push({ name: 'signup' })">SignUp</button>
    </div>
    <nuxt />
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
