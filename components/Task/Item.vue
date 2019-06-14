<template>
  <li
    :key="item._id"
    :class="{ done: item.done }"
    class="border rounded shadow mb-3 flex justify-between items-center shadow transition-shadow hover:shadow-md hover:bg-gray-100 select-none"
  >
    <div
      class="px-4 py-2 flex-1 mr-4 cursor-pointer"
      @click="modalOpen = !modalOpen"
    >
      <div class="font-medium">
        {{ item.title }}
      </div>
      <div class="text-sm">
        <span class="text-indigo-900">
          {{ dueAt }}
        </span>
        <span class="text-gray-600">
          {{ item.note | trimNote }}
        </span>
      </div>
      <div v-if="item.done" class="text-sm text-gray-500">
        {{ doneAt }}
      </div>
    </div>
    <div class="px-4 flex items-center justify-center relative">
      <div class="inline-block relative w-32 mr-4 ">
        <select
          v-model="item.priority"
          class=" text-center block appearance-none w-full bg-white px-2 py-1 pr-4 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          :class="priorityClass"
        >
          <option value="0">
            높음
          </option>
          <option value="10">
            중간
          </option>
          <option value="20">
            낮음
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
        class="bg-white hover:bg-gray-700 hover:border-gray-700 text-gray-700 hover:text-white font-bold py-1 px-2  border border-gray-500 rounded outline-none"
        @click.prevent="$emit('done', item)"
      >
        할일로
      </button>
      <button
        v-else
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  border border-blue-700 rounded outline-none mr-4"
        @click.prevent="$emit('done', item)"
      >
        마치기
      </button>
      <div class="relative text-xl p-2 outline-none">
        <button @click="actionOpen = !actionOpen">:</button>
        <div
          v-if="actionOpen"
          v-on-clickaway="closeDropdown"
          class="absolute right-0 top-0 w-40 border rounded z-20 bg-white shadow-lg"
        >
          <ul class="text-base">
            <li
              class="px-2 py-1 cursor-pointer hover:bg-black hover:text-white"
            >
              수정하기
            </li>
            <li
              class="px-2 py-1 cursor-pointer hover:bg-black hover:text-white"
            >
              삭제하기
            </li>
            <li
              class="px-2 py-1 cursor-pointer hover:bg-black hover:text-white"
              @click="actionOpen = false"
            >
              닫기
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition
      name="animate-modal"
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <modal v-if="modalOpen" @close="tryCloseModal">
        <div slot="header" class="flex-1 w-full p-4 justify-between">
          <label for="item-title" class="block">제목</label>
          <input
            id="item-title"
            v-model.trim="updatableItem.title"
            v-focus
            type="text"
            class="text-xl px-4 py-2 w-full rounded outline-none focus:bg-gray-100 border"
            @keyup.enter="tryUpdate"
          />
        </div>
        <div slot="body" class="w-full p-4 mb-4">
          <form class="flex flex-row w-full">
            <div class="flex-1 mr-4">
              <label for="item-note" class="block">노트</label>
              <textarea
                id="item-note"
                v-model="updatableItem.note"
                name="item-note"
                cols="30"
                rows="10"
                class="w-full h-full p-2 outline-none focus:bg-gray-100 border rounded"
              />
            </div>
            <div class="w-64">
              <div class="mb-4">
                <label for="item-list" class="block">목록</label>
                <div class="relative w-full border">
                  <select
                    id="item-list"
                    v-model="updatableItem.listId"
                    class=" text-center block appearance-none w-full bg-white px-4 py-2 outline-none rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  >
                    <option value="inbox">인박스</option>
                    <option
                      v-for="listItem in list"
                      :key="listItem._id"
                      :value="listItem._id"
                    >
                      {{ listItem.title }}
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
              </div>
              <div class="mb-4">
                <label for="item-priority">우선순위</label>
                <div class="relative w-full border">
                  <select
                    id="item-priority"
                    v-model="updatableItem.priority"
                    class=" text-center block appearance-none w-full bg-white px-4 py-2 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  >
                    <option value="0">
                      높음
                    </option>
                    <option value="10">
                      중간
                    </option>
                    <option value="20">
                      낮음
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
              </div>
              <div class="mb-4">
                <label for="item-due-at" class="block">예정일</label>
                <input
                  id="item-due-at"
                  v-model="updatableItem.dueAt"
                  class="border w-full px-4 py-2 rounded mb-2 outline-none hover:bg-blue-100"
                  type="date"
                />
              </div>
              <!-- <div>
                <label for="" class="block">Current Position</label>
                <button
                  class="border px-4 py-2"
                  @click.prevent="tryGetCurrentPosition"
                >
                  현재위치
                </button>
              </div> -->
            </div>
          </form>
        </div>
        <div slot="footer" class="w-full p-4 text-center">
          <button
            class="px-4 p-2 w-32 border rounded bg-blue-400 text-white outline-none"
            @click="tryUpdate"
          >
            저장하기
          </button>

          <button
            class="px-4 p-2 w-32 border rounded outline-none"
            @click="modalOpen = false"
          >
            닫기
          </button>
        </div>
      </modal>
    </transition>
  </li>
</template>

<script>
import Modal from '~/components/Common/Modal.vue'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway
  },
  components: {
    Modal
  },
  filters: {
    trimNote(value = '') {
      return value.slice(0, 100)
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modalOpen: false,
      actionOpen: false,
      updatableItem: null,
      list: []
    }
  },
  computed: {
    priorityClass() {
      return `priority-${this.item.priority}`
    },
    dueAt() {
      if (!this.item.dueAt) {
        return ''
      }
      if (this.$moment(this.item.dueAt).isSame(new Date(), 'd')) {
        return '오늘'
      }
      return `${this.$moment(this.item.dueAt).format('LL')}`
    },
    doneAt() {
      return `${this.$moment(this.item.doneAt).fromNow()} 완료함`
    }
  },
  watch: {
    'item.priority'(newPriority, oldPriority) {
      this.$emit('change-priority', { item: this.item, priority: newPriority })
    },
    async modalOpen(isOpen) {
      if (isOpen) {
        this.updatableItem = Object.assign({}, this.item)
        if (!this.updatableItem.listId) {
          this.updatableItem.listId = 'inbox'
        }
        const { data } = await this.$repo.lists.all()
        this.list = data
      } else {
        this.updatableItem = null
        this.list = []
      }
    }
  },
  methods: {
    tryGetCurrentPosition() {
      // navigator.geolocation.getCurrentPosition(position => {
      // })
    },
    tryUpdate() {
      // FIXME: 연타하는 경우 에러남
      if (this.updatableItem.title === '') {
        return
      }

      if (this.updatableItem.listId === 'inbox') {
        this.updatableItem.listId = null
      }

      this.$emit('update', this.updatableItem)
      this.modalOpen = false
    },
    tryCloseModal() {
      this.modalOpen = false
    },
    closeDropdown() {
      this.actionOpen = false
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
