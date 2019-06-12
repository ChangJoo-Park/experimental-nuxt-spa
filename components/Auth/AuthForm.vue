<template>
  <form
    class="block border sahdow p-4"
    @submit.prevent="$emit('on-submit', Object.assign({}, data))"
  >
    <div class="mb-4">
      <label for="">Email</label>
      <input
        v-model="data.email"
        type="text"
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        required
        autofocus
        v-focus
        autocomplete="email"
      />
    </div>
    <div class="mb-4">
      <label for="">Password</label>
      <input
        v-model="data.password"
        type="password"
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        required
        autocomplete="password"
      />
    </div>
    <input
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      value="Submit"
    />
  </form>
</template>

<script>
export default {
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
