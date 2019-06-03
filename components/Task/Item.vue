<template>
  <div class="flex flex-row">
    <div>
      {{ item.startDate }}/{{ item.endDate }}, {{ item.startTime }}/{{
        item.endTime
      }}
    </div>
    <div class="flex-1">
      {{ item.title }}
    </div>
    <div>
      <button>DONE</button>
      {{ item.priority }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
