<template>
  <ul>
    <item
      v-for="item in items"
      :key="item._id"
      :item="item"
      @change-priority="changePriority"
      @done="toggleDone"
    />
  </ul>
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
      return []
    }
  },
  methods: {
    changePriority() {},
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
