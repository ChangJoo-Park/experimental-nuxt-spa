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
          label: '할일'
        },
        {
          state: 'completed',
          label: '완료함'
        },
        {
          state: 'all',
          label: '모두'
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

<style lang="postcss">
#filter-nav .active {
  @apply font-bold border-b-4;
}
#filter-nav .filter-nav-link {
  @apply m-3 py-2 px-2 cursor-pointer outline-none;
}
</style>
