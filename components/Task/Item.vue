<template>
  <li
    :key="item._id"
    :class="{ done: item.done }"
    class="border rounded shadow mb-3 p-1 flex justify-between items-center shadow transition-shadow hover:shadow-md hover:bg-gray-100 select-none"
  >
    <div class="px-4 flex-1">
      <div class="font-medium cursor-pointer" @click="modalOpen = !modalOpen">
        {{ item.title }}
      </div>
      <div v-if="item.done" class="text-xs text-gray-500">
        {{ doneAt }}
      </div>
    </div>
    <div class="px-4 flex items-center justify-center relative">
      <div class="inline-block relative w-32 mr-4 text-xs">
        <select
          v-model="item.priority"
          class="text-xs text-center uppercase block appearance-none w-full bg-white px-2 py-1 pr-4 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
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
        class="bg-white hover:bg-gray-700 hover:border-gray-700 text-gray-700 hover:text-white font-bold py-1 px-2 text-xs border border-gray-500 rounded outline-none"
        @click.prevent="$emit('done', item)"
      >
        Todo
      </button>
      <button
        v-else
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs border border-blue-700 rounded outline-none"
        @click.prevent="$emit('done', item)"
      >
        Done
      </button>
    </div>
    <transition name="fade">
      <modal v-if="modalOpen">
        <div
          slot="header"
          class="flex-1 flex flex-row w-full p-4 justify-between"
        >
          <input
            v-model="item.title"
            class="text-xl px-4 py-2 w-full outline-none hover:bg-blue-100 focus:bg-blue-200"
          />
        </div>
        <div slot="body" class="w-full p-4">
          <form class="flex flex-row w-full">
            <div class="flex-1 mr-4">
              <textarea
                id="item-note"
                name="item-note"
                cols="30"
                rows="10"
                class="w-full h-full p-2 outline-none hover:bg-blue-100 focus:bg-blue-200 border rounded"
              />
            </div>
            <div class="w-48">
              <div>
                <label for="" class="block">Started Date</label>
                <input
                  class="border w-full px-4 py-2 rounded mb-2 outline-none hover:bg-blue-100"
                  type="date"
                />
              </div>
              <div>
                <label for="" class="block">Started Time</label>
                <input
                  class="border w-full px-4 py-2 rounded mb-2 outline-none hover:bg-blue-100"
                  type="time"
                />
              </div>
              <div>
                <label for="" class="block">End Date</label>
                <input
                  class="border w-full px-4 py-2 rounded mb-2 outline-none hover:bg-blue-100"
                  type="date"
                />
              </div>
              <div>
                <label for="" class="block">End Time</label>
                <input
                  class="border w-full px-4 py-2 rounded mb-2 outline-none hover:bg-blue-100"
                  type="time"
                />
              </div>
            </div>
          </form>
        </div>
        <div slot="footer" class="p-4">
          <button
            class="px-4 p-2 border rounded bg-blue-400 text-white outline-none"
            @click="modalOpen = false"
          >
            Save
          </button>

          <button
            class="px-4 p-2 border rounded outline-none"
            @click="modalOpen = false"
          >
            Close
          </button>
        </div>
      </modal>
    </transition>
  </li>
</template>

<script>
import Modal from '~/components/Common/Modal.vue'

export default {
  components: {
    Modal
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modalOpen: false
    }
  },
  computed: {
    priorityClass() {
      return `priority-${this.item.priority}`
    },
    doneAt() {
      return `${this.$moment(this.item.doneAt).fromNow()} 완료함`
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
