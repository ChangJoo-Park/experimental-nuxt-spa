<template>
  <div class="container mx-auto px-4">
    <new-task-input
      ref="new"
      class="select-none border-t-8 border-gray-700  rounded-t-lg p-4 shadow hover:shadow-xl transition-shadow"
      @on-submit="tryAddItem"
    />
    <div v-if="itemsCount">
      <div id="filter-nav" class="flex justify-center mb-4 select-none">
        <nuxt-link
          class="filter-nav-link"
          :to="{ name: 'app', query: { done: false } }"
        >
          Active
        </nuxt-link>
        <nuxt-link
          class="filter-nav-link"
          :to="{ name: 'app', query: { done: true } }"
        >
          Completed
        </nuxt-link>
        <nuxt-link class="filter-nav-link" :to="{ name: 'app' }">
          All
        </nuxt-link>
      </div>
      <div>
        <ul>
          <item
            v-for="item in sortedItems"
            :key="item._id"
            :item="item"
            @change-priority="changePriority"
            @done="toggleDone"
          />
        </ul>
      </div>
    </div>
    <div v-else>
      아이템이 없습니다 :(
    </div>
  </div>
</template>

<script>
import NewTaskInput from '~/components/Task/NewTaskInput.vue'
import Item from '~/components/Task/Item.vue'

const getItemMethod = (repo, query) => {
  const { done = '' } = query
  switch (done) {
    case true:
    case 'true':
      return repo.items.getCompleted
    case false:
    case 'false':
      return repo.items.getActivated
    default:
      return repo.items.all
  }
}

export default {
  components: {
    NewTaskInput,
    Item
  },
  data() {
    return {
      newItemTitle: ''
    }
  },
  computed: {
    itemsCount() {
      if (!this.items || this.items.length === 0) {
        return 0
      }
      return this.items.length
    },
    sortedItems() {
      return this.items
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .sort((a, b) => a.done - b.done)
    }
  },
  watch: {
    async $route(newRoute, oldRoute) {
      const response = await getItemMethod(this.$repo, newRoute.query)()
      this.items = response.data
    }
  },
  async asyncData({ app, params, query, error }) {
    try {
      const response = await getItemMethod(app.$repo, query)()
      return {
        items: response.data
      }
    } catch (err) {
      return error(err)
    }
  },
  mounted() {
    window.addEventListener('keyup', this.focusNewInput)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.focusNewInput)
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
          this.$router.push({ name: 'app', query: { done: 'false' } })
        })
        .catch(error => console.error(error))
    },
    toggleDone(item) {
      return this.$repo.items
        .toggleItemDone(item._id, item.done)
        .then(response => {
          if (!response.data.ok) {
            return
          }
          const index = this.items.findIndex(i => i._id === item._id)
          if (this.$route.query.done === undefined) {
            this.items[index].done = !this.items[index].done
          } else {
            this.items.splice(index, 1)
          }
        })
        .catch(error => console.error(error))
    },
    changePriority({ item, priority }) {
      console.log('item => ', item)
      console.log('priority => ', priority)
      this.$repo.items
        .changePriority(item._id, priority)
        .then(response => {
          // console.log(response.data)
        })
        .catch(e => {
          // console.error(e)
        })
    },
    focusNewInput(e) {
      if (e.key === '/') {
        this.$refs.new.$el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style lang="postcss">
#filter-nav .nuxt-link-exact-active {
  @apply font-bold border-b-4;
}
#filter-nav .filter-nav-link {
  @apply m-3 py-4 px-8 text-xl cursor-pointer;
}
</style>
