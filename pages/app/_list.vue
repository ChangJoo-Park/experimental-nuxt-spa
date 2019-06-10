<template>
  <div class="p-4">
    <new-task-input
      ref="new"
      class="select-none border-t-8 border-gray-700  rounded p-4 shadow"
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
  computed: {
    items() {
      return this.list.items || []
    }
  },
  watch: {
    async state(newState) {
      const { list } = this.$route.params
      const { data } = await this.$repo.lists.findOne(list, newState)
      this.list = data
    }
  },
  async asyncData({ app, params }) {
    const { data } = await app.$repo.lists.findOne(params.list, 'active')
    return {
      list: data,
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
