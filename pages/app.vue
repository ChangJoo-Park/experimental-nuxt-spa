<template>
  <div>
    <h1>Hello World</h1>
    <form class="border" @submit.prevent="tryAddItem">
      <div>
        <input v-model="newItemTitle" type="text" />
      </div>
      <input type="submit" />
    </form>
    <div v-if="itemsCount">
      {{ itemsCount }}
      <pre>{{ items }}</pre>
    </div>
    <div v-else>
      아이템이 없습니다 :(
    </div>
  </div>
</template>

<script>
export default {
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
    tryAddItem() {
      return this.$repo.items
        .create(this.newItemTitle)
        .then(response => {
          this.items.push(response.data)
          this.newItemTitle = ''
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
