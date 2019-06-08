<template>
  <div id="filter-nav" class="flex justify-center mb-4 select-none">
    <button
      v-for="nav in navs"
      :key="nav.state"
      class="filter-nav-link"
      :class="{ active: currentState(nav) }"
      :to="{ name: 'app-inbox' }"
      @click="updateState(nav.state)"
    >
      {{ nav.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      default: () => 'active'
    }
  },
  data() {
    return {
      navs: [
        {
          state: 'active',
          label: 'Active'
        },
        {
          state: 'completed',
          label: 'Completed'
        },
        {
          state: 'all',
          label: 'All'
        }
      ]
    }
  },
  methods: {
    updateState(state) {
      this.$emit('update-state', state)
    },
    currentState(value) {
      return this.state === value.state
    }
  }
}
</script>
