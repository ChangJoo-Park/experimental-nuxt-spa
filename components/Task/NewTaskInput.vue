<template>
  <div class="mb-4">
    <label for="new-form-input" class="font-bold text-grey-darker block mb-2">
      {{ label }}
    </label>
    <input
      id="new-form-input"
      v-model.trim="title"
      type="text"
      class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal font-semibold text-lg"
      required
      autocomplete="off"
      @keyup.enter="trySubmit"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => 'New Task',
      required: false
    }
  },
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    window.addEventListener('keyup', this.focusNewInput)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.focusNewInput)
  },
  methods: {
    trySubmit() {
      this.$emit('on-submit', this.title)
      this.title = ''
    }
  }
}
</script>
