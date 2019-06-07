<template>
  <div class="p-4">
    <new-task-input
      ref="new"
      class="select-none border-t-8 border-gray-700  rounded-t-lg p-4 shadow hover:shadow-xl transition-shadow"
      @on-submit="tryAddItem"
    />
    <div id="filter-nav" class="flex justify-center mb-4 select-none">
      <button class="filter-nav-link" :to="{ name: 'app-inbox' }">
        Active
      </button>
      <button class="filter-nav-link" :to="{ name: 'app-inbox' }">
        Completed
      </button>
      <button class="filter-nav-link" :to="{ name: 'app-inbox' }">
        All
      </button>
    </div>
    <task-list :items="items" />
  </div>
</template>

<script>
import NewTaskInput from '~/components/Task/NewTaskInput.vue'
import TaskList from '~/components/Task/List.vue'

export default {
  async asyncData({ app }) {
    const { data } = await app.$repo.items.find()
    return {
      items: data,
      state: 'active'
    }
  },
  components: {
    NewTaskInput,
    TaskList
  },
  methods: {
    tryAddItem(title) {
      if (!title) {
        return
      }
      return this.$repo.items
        .create(title)
        .then(response => {
          // TODO: state에 따라 다르게 조작해야함
          this.$refs.new.$el.querySelector('input').blur()
          this.items.push(response.data)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
