<template>
  <div>
    <h1>Login</h1>
    <auth-form @on-submit="trySignIn" />
    <nuxt-link :to="{ name: 'signup' }"></nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AuthForm from '~/components/Auth/AuthForm.vue'

export default {
  components: {
    AuthForm
  },
  methods: {
    ...mapActions(['setUser']),
    trySignIn(payload) {
      this.$repo.auth
        .signin(payload)
        .then(response => {
          this.setUser(response.data)
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
