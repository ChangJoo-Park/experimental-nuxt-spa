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
    toggleDone() {}
  }
}
</script>
