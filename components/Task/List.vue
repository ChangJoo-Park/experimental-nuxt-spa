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
  <div v-else class="flex items-center justify-center" style="height: 300px;">
    <div class="text-6xl font-mono text-gray-700">There is no items</div>
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
    }
  },
  computed: {
    sortedItems() {
      return this.items
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .sort((a, b) => a.done - b.done)
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
