<template>
  <form class="block border sahdow" @submit.prevent="$emit('on-submit', Object.assign({}, data))">
    <h1>Hello World {{ signup }}</h1>
    <div>
      <label for="">Email</label>
      <input type="text" v-model="data.email">
    </div>
    <div>
      <label for="">Password</label>
      <input type="text" v-model="data.password">
    </div>
    <input type="submit">
  </form>
</template>

<script>
export default {
  props: {
    signup: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>

</style>
