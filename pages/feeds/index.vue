<template>
  <div>
    <div>
      <form class="border" @submit.prevent="tryWriteFeed">
        <textarea v-model="newFeed" class="block w-full" />
        <input type="submit" />
      </form>
    </div>
    <div>
      <pre>{{ feeds }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app }) {
    return app.$repo.feeds
      .all()
      .then(response => {
        return {
          feeds: response.data,
          newFeed: ''
        }
      })
      .catch(err => {
        console.errror(err)
      })
  },
  methods: {
    tryWriteFeed() {
      this.$repo.feeds
        .create({ body: this.newFeed })
        .then(response => {
          this.$router.go()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
