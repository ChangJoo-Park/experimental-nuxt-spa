<template>
  <div>
    <h1>SignUp</h1>
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
      console.log('payload => ', payload)
      this.$repo.auth
        .signup(payload)
        .then(result => {
          console.log(result)
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
