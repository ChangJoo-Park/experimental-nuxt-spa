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
          <li
            v-for="item in items"
            :key="item._id"
            class="border rounded shadow mb-1 p-4 flex justify-between items-center shadow cursor-pointer transition-shadow hover:shadow-md hover:bg-gray-100 select-none"
          >
            <div class="px-4">
              <div class="font-medium text-lg">
                {{ item.title }}
              </div>
            </div>
            <div class="px-4">
              <button
                v-if="item.done"
                class="hover:bg-gray-700 hover:border-gray-700 text-gray-700 hover:text-white font-bold py-2 px-4 border border-gray-500 rounded outline-none"
                @click="toggleDone(item)"
              >
                Undone
              </button>
              <button
                v-else
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded outline-none"
                @click="toggleDone(item)"
              >
                Done
              </button>
            </div>
          </li>
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
    NewTaskInput
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
