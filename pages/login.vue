<template>
  <div class="container mx-auto max-w-md">
    <h1 class="font-bold uppercase my-4 text-center text-6xl">
      {{ $t('auth.doLogin') }}
    </h1>
    <auth-form @on-submit="trySignIn" />
    <nuxt-link class="hover:underline text-blue-500" to="/signup">
      {{ $t('auth.needSignUp') }}
    </nuxt-link>
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
          this.$router.push('/app')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
