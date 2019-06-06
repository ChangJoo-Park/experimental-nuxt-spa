<template>
  <div class="container mx-auto max-w-md">
    <h1 class="font-bold uppercase my-4 text-center text-6xl">Sign Up</h1>
    <auth-form @on-submit="trySignUp" />
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
