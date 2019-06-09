<template>
  <div class="p-4">
    <new-task-input
      ref="new"
      class="select-none border-t-8 border-gray-700  rounded-t-lg p-4 shadow hover:shadow-xl transition-shadow"
      @on-submit="tryAddItem"
    />

    <item-filter :state="state" @update-state="updateState" />

    <task-list
      :items="items"
      @toggle-done="toggleDone"
      @update-item="onUpdateItem"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import NewTaskInput from '~/components/Task/NewTaskInput.vue'
import ItemFilter from '~/components/Task/Filter.vue'
import TaskList from '~/components/Task/List.vue'

export default {
  components: {
    NewTaskInput,
    TaskList,
    ItemFilter
  },
  watch: {
    async state(newState) {
      const query = {
        list: this.$route.params.list
      }
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
  async asyncData({ app, params }) {
    const { data } = await app.$repo.items.find({
      done: false,
      list: params.list
    })
    return {
      items: data,
      state: 'active'
    }
  },
  methods: {
    updateState(state) {
      this.state = state
    },
    tryAddItem(title) {
      if (!title) {
        return
      }
      return this.$repo.items
        .create(title, this.$route.params.list)
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
    toggleDone(item) {
      const index = this.items.findIndex(i => i._id === item._id)
      if (this.state === 'all') {
        this.items[index].done = !this.items[index].done
      } else {
        this.items.splice(index, 1)
      }
    },
    onUpdateItem(item) {
      console.log('onUpdateItem => ', item._id)
      const index = this.items.findIndex(i => i._id === item._id)
      console.log('index => ', index)
      Vue.set(this.items, index, item)
    }
  }
}
</script>
