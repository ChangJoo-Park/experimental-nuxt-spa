<template>
  <div class="container mx-auto px-4 mt-4">
    <h1 class="dashboard">DASHBOARD</h1>
  </div>
</template>

<script>
export default {
  created() {
    return this.$router.replace({ name: 'app-inbox' })
  }
}
</script>
