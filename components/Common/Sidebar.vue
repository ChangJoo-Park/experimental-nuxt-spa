<template>
  <div id="sidebar" class="flex-none w-full md:max-w-xs bg-gray-200">
    <div class="p-4">
      <button
        class="border border-blue-500 rounded px-4 py-2 text-blue-500 bg-white w-full hover:bg-blue-500 hover:text-white"
        @click="openNewListForm = true"
      >
        New List
      </button>
    </div>
    <div
      v-if="openNewListForm"
      key="newListForm"
      class="m-4 p-4 bg-white shadow"
    >
      <div class="mb-4">
        <label for="">New List Name</label>
        <input
          v-model.trim="newList.title"
          type="text"
          class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          autofocus
        />
      </div>
      <button
        class="border border-gray-500 rounded px-4 py-2 text-gray-500 bg-white hover:bg-gray-500 hover:text-white"
        @click="openNewListForm = false"
      >
        Cancel
      </button>
      <button
        class="border border-white-500 rounded px-4 py-2 text-blue-500 bg-white hover:bg-blue-500 hover:text-white"
        @click="tryCreateList"
      >
        Submit
      </button>
    </div>
    <ul class="list-none">
      <nuxt-link
        class="text-xl font-bold select-none cursor-pointer p-4 hover:underline hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app-dashboard' }"
      >
        Home
      </nuxt-link>

      <nuxt-link
        class="text-xl font-bold select-none cursor-pointer p-4 hover:underline hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app-inbox' }"
      >
        Inbox
      </nuxt-link>
      <nuxt-link
        v-for="list in lists"
        :key="list._id"
        class="text-xl font-bold select-none cursor-pointer p-4 hover:underline hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app-list', params: { list: list._id } }"
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
      lists: [],
      openNewListForm: false,
      newList: {
        title: ''
      }
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
  },
  methods: {
    tryCreateList() {
      if (this.newList.title.trim() === 0) {
        return
      }
      this.openNewListForm = false
      this.$repo.lists
        .create({
          title: this.newList.title
        })
        .then(response => {
          this.lists.push(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="postcss">
#sidebar .nuxt-link-active {
  @apply bg-blue-600 text-white no-underline;
}
</style>
