<template>
  <div
    class="backdrop fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center z-50"
    style="background-color: rgba(0, 0, 0, 0.3);"
  >
    <div
      class="flex flex-col items-center justify-center w-3/5 min-w-md bg-white border-t-8 border-red-400 rounded"
    >
      <slot name="header" />
      <slot name="body" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.document.addEventListener('keyup', this.emitClose)
  },
  beforeDestroy() {
    window.document.removeEventListener('keyup', this.emitClose)
  },
  methods: {
    emitClose(e) {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    }
  }
}
</script>
