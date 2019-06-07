<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  methods: {
    getQuery(type) {
      const query = {}
      switch (type) {
        case 'active':
          query.done = false
          break
        case 'completed':
          query.done = true
          break
        default:
          break
      }
      if (this.$route.query.list) {
        query.list = this.$route.query.list
      }
      return query
    },
    focusNewInput(e) {
      if (e.key === '/') {
        this.$refs.new.$el.querySelector('input').focus()
      }
    },
    tryAddItem(title) {
      if (!title) {
        return
      }

      return this.$repo.items
        .create(title, this.$route.query.list)
        .then(response => {
          this.$refs.new.$el.querySelector('input').blur()
          if (this.$route.query.done === 'true') {
            this.$router.push({ name: 'app', query: { done: 'false' } })
          } else {
            this.items.push(response.data)
          }
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
