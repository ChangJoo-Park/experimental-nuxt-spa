<template>
  <div class="container">
    <button @click="$router.push({ name: 'login' })">Login</button>
    <button @click="$router.push({ name: 'signup' })">SignUp</button>
  </div>
</template>

<script>
export default {}
</script>
