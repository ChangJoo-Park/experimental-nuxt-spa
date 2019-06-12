<template>
  <div class="container mx-auto max-w-md">
    <h1 class="font-bold uppercase my-4 text-center text-6xl">
      {{ $t('auth.doSignup') }}
    </h1>
    <auth-form @on-submit="trySignUp" />
    <nuxt-link class="hover:underline text-blue-500" to="/login">
      {{ $t('auth.alreadySignUp') }}
    </nuxt-link>
  </div>
</template>

<script>
import AuthForm from '~/components/Auth/AuthForm.vue'

export default {
  components: {
    AuthForm
  },
  methods: {
    trySignUp(payload) {
      this.$repo.auth
        .signup(payload)
        .then(result => {
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
