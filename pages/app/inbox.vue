<template>
  <div class="p-4">
    <new-task-input
      ref="new"
      class="select-none border-t-8 border-gray-700  rounded-t-lg p-4 shadow hover:shadow-xl transition-shadow"
      @on-submit="tryAddItem"
    />
    <div id="filter-nav" class="flex justify-center mb-4 select-none">
      <button
        class="filter-nav-link"
        :class="{ active: currentState('active') }"
        :to="{ name: 'app-inbox' }"
        @click="state = 'active'"
      >
        Active
      </button>
      <button
        class="filter-nav-link"
        :class="{ active: currentState('completed') }"
        :to="{ name: 'app-inbox' }"
        @click="state = 'completed'"
      >
        Completed
      </button>
      <button
        class="filter-nav-link"
        :class="{ active: currentState('all') }"
        :to="{ name: 'app-inbox' }"
        @click="state = 'all'"
      >
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
  components: {
    NewTaskInput,
    TaskList
  },
  watch: {
    async state(newState) {
      const query = {}
      switch (newState) {
        case 'active':
          query.done = false
          break
        case 'completed':
          query.done = true
          break
      }
      const { data } = await this.$repo.items.find(query)
      this.items = data
    }
  },
  async asyncData({ app }) {
    const { data } = await app.$repo.items.find({ done: false })
    return {
      items: data,
      state: 'active'
    }
  },
  methods: {
    tryAddItem(title) {
      if (!title) {
        return
      }
      return this.$repo.items
        .create(title)
        .then(response => {
          this.$refs.new.$el.querySelector('input').blur()
          if (this.state === 'active') {
            this.items.unshift(response.data)
          } else {
            this.state = 'active'
          }
        })
        .catch(error => console.error(error))
    },
    currentState(value) {
      return value === this.state
    }
  }
}
</script>
