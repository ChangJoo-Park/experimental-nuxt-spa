<template>
  <div class="flex-none w-full md:max-w-xs bg-gray-200">
    <div class="p-4">
      <button
        class="border border-blue-500 rounded px-4 py-2 text-blue-500 bg-white w-full hover:bg-blue-500 hover:text-white"
      >
        New List
      </button>
    </div>
    <ul class="list-none">
      <nuxt-link
        class="text-xl font-bold select-none cursor-pointer p-4 hover:underline hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app', query: { done: false } }"
      >
        Inbox
      </nuxt-link>
      <nuxt-link
        v-for="list in lists"
        :key="list._id"
        class="text-xl font-bold select-none cursor-pointer p-4 hover:underline hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app', query: { done: false, list: list._id } }"
      >
        {{ list.title }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.$repo.lists
      .all()
      .then(response => {
        this.lists = response.data
      })
      .catch(e => {
        console.error(e)
      })
  }
}
</script>
