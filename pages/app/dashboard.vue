<template>
  <div class="container mx-auto px-4 mt-4">
    <task-list />
  </div>
</template>

<script>
import TaskList from '~/components/Task/List.vue'

// const getItemMethod = (repo, query) => {
//   const { done = '' } = query
//   switch (done) {
//     case true:
//     case 'true':
//       return repo.items.getCompleted
//     case false:
//     case 'false':
//       return repo.items.getActivated
//     default:
//       return repo.items.all
//   }
// }

export default {
  components: {
    TaskList
  },
  methods: {
    toggleDone(item) {
      return this.$repo.items
        .toggleItemDone(item._id, item.done)
        .then(response => {
          if (!response.data.ok) {
            return
          }
          const index = this.items.findIndex(i => i._id === item._id)
          if (this.$route.query.done === undefined) {
            this.items[index].done = !this.items[index].done
          } else {
            this.items.splice(index, 1)
          }
        })
        .catch(error => console.error(error))
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
