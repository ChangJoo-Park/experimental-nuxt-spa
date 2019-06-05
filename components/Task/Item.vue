<template>
  <li
    :key="item._id"
    :class="{ done: item.done }"
    class="border rounded shadow mb-3 p-4 flex justify-between items-center shadow transition-shadow hover:shadow-md hover:bg-gray-100 select-none"
  >
    <div class="px-4">
      <div class="font-medium text-lg cursor-pointer">
        {{ item.title }}
      </div>
    </div>
    <div class="px-4 flex items-center justify-center relative">
      <div class="inline-block relative w-32 mr-4">
        <select
          v-model="item.priority"
          class="text-sm text-center uppercase block appearance-none w-full bg-white px-4 py-2 pr-4 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          :class="priorityClass"
        >
          <option value="0">
            High
          </option>
          <option value="10">
            Medium
          </option>
          <option value="20">
            Low
          </option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>

      <button
        v-if="item.done"
        class="bg-white hover:bg-gray-700 hover:border-gray-700 text-gray-700 hover:text-white font-bold py-2 px-4 border border-gray-500 rounded outline-none"
        @click="$emit('done', item)"
      >
        Todo
      </button>
      <button
        v-else
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded outline-none"
        @click="$emit('done', item)"
      >
        Done
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    priorityClass() {
      return `priority-${this.item.priority}`
    }
  },
  watch: {
    'item.priority'(newPriority, oldPriority) {
      this.$emit('change-priority', { item: this.item, priority: newPriority })
    }
  }
}
</script>

<style lang="postcss">
.done {
  @apply bg-gray-200 text-gray-700;
}

.priority-0 {
  @apply bg-red-500 text-white border border-red-400;
}
.priority-10 {
  @apply bg-yellow-500 text-black border border-yellow-400;
}
.priority-20 {
  @apply bg-white text-black border border-gray-500;
}
</style>
