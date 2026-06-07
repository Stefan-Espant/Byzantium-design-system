<script setup lang="ts">
  import { computed } from 'vue'
  import { useAnnouncer } from '../../../composables/useAnnouncer'

  defineOptions({ name: 'ByzAnnouncer' })

  const { message, politeness } = useAnnouncer()

  const politeMessage = computed(() => politeness.value === 'polite' ? message.value : '')
  const assertiveMessage = computed(() => politeness.value === 'assertive' ? message.value : '')
</script>

<template>
  <div>
    <div
      aria-live="polite"
      aria-atomic="true"
      class="byz-announcer"
    >{{ politeMessage }}</div>
    <div
      aria-live="assertive"
      aria-atomic="true"
      class="byz-announcer"
    >{{ assertiveMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
.byz-announcer {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
