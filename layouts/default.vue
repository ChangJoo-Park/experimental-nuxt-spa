<template>
  <div>
    <navbar />
    <div class="min-h-screen md:flex">
      <div class="flex-none w-full md:max-w-xs bg-purple-500">
        <button>New List</button>
        <ul>
          <li>Inbox</li>
        </ul>
      </div>
      <div class="flex-1 container mx-auto">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>
