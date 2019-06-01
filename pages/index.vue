<template>
  <div class="container">
    <form @submit.prevent="addItem">
      <div>
        <input v-model="newItem.title" type="text" class="border" required />
      </div>
      <input type="submit" />
    </form>
    <div>
      <ul>
        <li v-for="item in items" :key="item._id">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        title: ''
      }
    }
  },
  asyncData({ app: { $repo } }) {
    return $repo.items.all().then(response => {
      return {
        items: response.data
      }
    })
  },
  methods: {
    addItem() {
      this.$repo.items.create(Object.assign({}, this.newItem)).then(result => {
        this.newItem.title = ''
        this.items.push(result.data)
      })
    }
  }
}
</script>
