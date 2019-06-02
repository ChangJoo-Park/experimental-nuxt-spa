<template>
  <div>
    <h1>Hello World</h1>
    <new-task-input @on-submit="tryAddItem" />
    <div v-if="itemsCount">
      <div>
        <ul>
          <li v-for="item in items" :key="item._id">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      아이템이 없습니다 :(
    </div>
  </div>
</template>

<script>
import NewTaskInput from '~/components/Task/NewTaskInput.vue'

export default {
  components: {
    NewTaskInput
  },
  data() {
    return {
      newItemTitle: ''
    }
  },
  computed: {
    itemsCount() {
      if (!this.items || this.items.length === 0) {
        return 0
      }
      return this.items.length
    }
  },
  asyncData({ app: { $repo } }) {
    return $repo.items
      .all()
      .then(response => {
        return {
          items: response.data
        }
      })
      .catch(error => console.errro(error))
  },
  methods: {
    tryAddItem(title) {
      if (!title) {
        return
      }

      return this.$repo.items
        .create(title)
        .then(response => {
          this.items.push(response.data)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
