<template>
  <div id="sidebar" class="flex-none w-full md:max-w-xs bg-blue-100">
    <ul class="list-none">
      <!-- <nuxt-link
        class="text-lg select-none cursor-pointer p-4 hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app-dashboard' }"
      >
        Home
      </nuxt-link> -->
      <nuxt-link
        class="text-lg select-none cursor-pointer p-4 hover:bg-blue-500 hover:text-white"
        tag="li"
        :to="{ name: 'app-inbox' }"
      >
        인박스
      </nuxt-link>
      <div class="pl-2 bg-white">
        <div class="flex justify-center items-center">
          <div class="flex-1">
            목록
          </div>
          <div
            v-if="!openNewListForm"
            class="px-4 py-2 text-center"
            style="min-width: 40px;"
          >
            <button
              class="border border-blue-500 rounded px-4 py-1 text-sm text-blue-500 bg-white hover:bg-blue-500 hover:text-white"
              @click="openNewListForm = true"
            >
              New
            </button>
          </div>
        </div>
        <form
          v-if="openNewListForm"
          key="newListForm"
          class="m-4 p-4 bg-gray-100 rounded shadow"
          @submit.prevent="tryCreateList"
        >
          <div class="mb-4">
            <label for="">새 목록 이름</label>
            <input
              v-model.trim="newList.title"
              v-focus
              type="text"
              class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              :autofocus="'autofocus'"
            />
          </div>
          <div class="text-center">
            <button
              class="border border-blue-500 rounded px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-700"
              @click="tryCreateList"
            >
              만들기
            </button>
            <button
              class="border border-gray-500 rounded px-4 py-2 text-sm text-gray-500 bg-white hover:bg-gray-500 hover:text-white"
              @click.prevent="openNewListForm = false"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
      <nuxt-link
        v-for="list in lists"
        :key="list._id"
        class="list cursor-pointer select-none p-4 hover:bg-blue-500 hover:text-white flex justify-between items-center"
        tag="li"
        :to="{ name: 'app-list', params: { list: list._id } }"
      >
        <div class="flex-1 flex justify-between">
          <div v-if="openUpdateTitle" class="text-black">
            <input v-model="list.title" v-focus type="text" class="px-4 py-2" />
          </div>
          <div v-else>{{ list.title }}</div>
        </div>
        <div class="list-action text-xs opacity-0 appearance-none hover:block">
          <button
            class="hover:text-white hover:bg-red-600 hover:border-red-700 px-2 py-1 border rounded outline-none"
            @click="tryRemoveList(list)"
          >
            삭제
          </button>
        </div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  filters: {
    doneItem(items) {
      const activeItems = items.filter(item => !item.done)
      return activeItems.length > 0 ? activeItems.length : ''
    }
  },
  data() {
    return {
      lists: [],
      openNewListForm: false,
      openUpdateTitle: false,
      newList: {
        title: ''
      }
    }
  },
  mounted() {
    this.$repo.lists
      .all()
      .then(response => {
        this.lists = response.data
      })
      .catch(e => {
        console.error(e)
      })
  },
  methods: {
    tryCreateList() {
      if (this.newList.title.trim() === 0) {
        return
      }
      this.openNewListForm = false
      this.$repo.lists
        .create({
          title: this.newList.title
        })
        .then(response => {
          this.lists.push(response.data)
          this.$router.push({
            name: 'app-list',
            params: { list: response.data._id }
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    tryRemoveList(list) {
      this.$repo.lists
        .destroyOne(list._id)
        .then(repsonse => {
          const index = this.lists.findIndex(l => l._id === list._id)
          this.lists.splice(index, 1)
          this.$router.push('/app')
        })
        .catch(error => {
          console.error(error)
        })
    },
    tryUpdateList(list) {
      if (list.title === '') {
        return
      }
      this.$repo.lists
        .patchOne(list._id, { title: list.title })
        .then(repsonse => {
          this.openUpdateTitle = false
        })
        .catch(error => {
          console.error(error)
        })
      this.openUpdateTitle = false
    }
  }
}
</script>

<style lang="postcss">
#sidebar .nuxt-link-active {
  @apply bg-blue-600 text-white no-underline;
}
.list:hover .list-action {
  opacity: 1;
}
</style>
