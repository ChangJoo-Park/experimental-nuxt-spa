<template>
  <div class="container mx-auto px-4">
    <new-task-input
      class="select-none border-t-8 border-gray-700  rounded-t-lg p-4 shadow hover:shadow-xl transition-shadow"
      @on-submit="tryAddItem"
    />
    <div v-if="itemsCount">
      <div class="flex justify-center mb-4 select-none">
        <div
          class="m-3 py-4 px-8 text-xl cursor-pointer font-bold border-b-4 rounded hover:border-b-4"
        >
          All
        </div>
        <div
          class="m-3 py-4 px-8 text-xl cursor-pointer hover:bg-gray-400 hover:border-b-4 hover:text-white"
        >
          Active
        </div>
        <div
          class="m-3 py-4 px-8 text-xl cursor-pointer hover:bg-gray-400 hover:border-b-4 hover:text-white"
        >
          Completed
        </div>
      </div>
      <div>
        <ul>
          <li
            v-for="item in items"
            :key="item._id"
            class="border shadow mb-4 p-4 flex justify-between items-center shadow cursor-pointer transition-shadow hover:shadow-md hover:bg-gray-100 select-none"
          >
            <div class="px-4">
              <div>
                {{ item.title }}
              </div>
            </div>
            <div class="px-4">
              <button
                v-if="item.done"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Undone
              </button>
              <button
                v-else
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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
  asyncData({ app: { $repo } }) {
    return $repo.items
      .all()
      .then(response => {
        return {
          items: response.data
        }
      })
      .catch(error => console.errro(error))
  },
  methods: {
    tryAddItem(title) {
      if (!title) {
        return
      }

      return this.$repo.items
        .create(title)
        .then(response => {
          this.items.push(response.data)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
