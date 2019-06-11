<template>
  <div class="container h-full flex flex-col justify-center items-center">
    <div v-if="error.statusCode === 404" class="w-full text-center">
      <img
        src="~/assets/images/404_page_not_found_2.svg"
        class="inline-block mb-4 select-none w-4/5"
      />
    </div>
    <h1 v-else>An error occurred</h1>
    <div>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
