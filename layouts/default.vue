<template>
  <div>
    <navbar />
    <div class="md:flex" style="min-height: calc(100vh - 80px)">
      <sidebar v-if="showSidebar" />
      <div class="flex-1 container mx-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Sidebar from '~/components/Common/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      showSidebar: false
    }
  },
  watch: {
    $route(newRoute) {
      this.showSidebar = newRoute.path.includes('app')
    }
  },
  mounted() {
    if (this.$route.path.includes('app')) {
      this.showSidebar = true
    }
  }
}
</script>
