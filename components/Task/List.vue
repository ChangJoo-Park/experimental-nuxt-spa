<template>
  <div v-if="sortedItems && sortedItems.length" class="overflow-hidden">
    <ul>
      <item
        v-for="item in sortedItems"
        :key="item._id"
        :item="item"
        @update="updateItem"
        @change-priority="changePriority"
        @done="toggleDone"
      />
    </ul>
  </div>
  <div v-else class="flex items-center justify-center mt-4">
    <div
      class="text-4xl font-mono text-gray-700 text-center flex flex-col justify-center items-center w-full"
    >
      <img
        v-if="state === 'active'"
        class="h-64"
        src="~/assets/images/partying_2(1).svg"
      />
      <img
        v-else-if="state === 'completed'"
        class="h-64"
        src="~/assets/images/notes.svg"
      />
      <img
        v-else
        class="h-64"
        src="~/assets/images/working_with_computer.svg"
      />
      <div>
        There is no items
      </div>
    </div>
  </div>
</template>

<script>
import Item from '~/components/Task/Item.vue'

export default {
  components: {
    Item
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    },
    state: {
      state: String,
      default: () => 'active',
      required: true
    }
  },
  computed: {
    sortedItems() {
      return this.items
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .sort((a, b) => a.done - b.done)
    },
    emptyImage() {
      switch (this.state) {
        case 'active':
          return '~/assets/images/partying_2(1).svg'
        case 'all':
          return '~/assets/images/partying_2.svg'
        case 'completed':
          return '~/assets/images/notes.svg'
        default:
          return '~/assets/images/partying_2(1).svg'
      }
    }
  },
  methods: {
    updateItem(item) {
      console.log('update items => ', item._id)
      this.$repo.items
        .updateOne(item._id, item)
        .then(response => {
          console.log('response => ', response)
          this.$emit('update-item', item)
        })
        .catch(e => {
          // console.error(e)
        })
    },
    changePriority({ item, priority }) {
      this.$repo.items
        .changePriority(item._id, priority)
        .then(response => {
          // console.log(response.data)
        })
        .catch(e => {
          // console.error(e)
        })
    },
    toggleDone(item) {
      return this.$repo.items
        .toggleItemDone(item._id, item.done)
        .then(response => {
          if (!response.data.ok) {
            return
          }
          this.$emit('toggle-done', item)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style lang="postcss">
.list-item-leave-to {
  position: absolute;
}
</style>
