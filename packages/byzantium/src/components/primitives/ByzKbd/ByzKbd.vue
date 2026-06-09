<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzKbd' })

  interface Props {
    keys: string | string[]
  }

  const props = defineProps<Props>()

  const keyList = computed(() =>
    Array.isArray(props.keys) ? props.keys : [props.keys]
  )
</script>

<template>
  <span class="byz-kbd" aria-label="toetsencombinatie">
    <template v-for="(key, i) in keyList" :key="key">
      <kbd class="byz-kbd__key">{{ key }}</kbd>
      <span v-if="i < keyList.length - 1" class="byz-kbd__sep" aria-hidden="true">+</span>
    </template>
  </span>
</template>

<style lang="scss" scoped>
.byz-kbd {
  display: inline-flex;
  align-items: center;
  gap: var(--byz-space-1);

  &__key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.125rem var(--byz-space-2);
    min-width: 1.5rem;
    border: 1px solid var(--byz-color-border);
    border-bottom-width: 2px;
    border-radius: 0.25rem;
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text-secondary);
    font-family: var(--byz-font-mono);
    font-size: var(--byz-text-xs);
    line-height: 1.4;
    box-shadow: 0 1px 0 var(--byz-color-border);
  }

  &__sep {
    color: var(--byz-color-text-muted);
    font-size: var(--byz-text-xs);
    font-family: var(--byz-font-sans);
  }
}
</style>
