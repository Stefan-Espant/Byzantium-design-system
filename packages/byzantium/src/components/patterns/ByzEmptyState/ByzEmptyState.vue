<script setup lang="ts">
  defineOptions({ name: 'ByzEmptyState' })

  interface Props {
    title: string
    description?: string
    icon?: string
  }

  withDefaults(defineProps<Props>(), {
    icon: '◇'
  })
</script>

<template>
  <div class="byz-empty-state">
    <div class="byz-empty-state__icon-wrap" aria-hidden="true">
      <span class="byz-empty-state__icon">{{ icon }}</span>
    </div>
    <h2 class="byz-empty-state__title">{{ title }}</h2>
    <p v-if="description" class="byz-empty-state__description">{{ description }}</p>
    <div v-if="$slots.actions" class="byz-empty-state__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.byz-empty-state {
  text-align: center;
  padding: var(--byz-space-16) var(--byz-space-8);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: color-mix(in srgb, var(--byz-color-accent) 20%, transparent);
    margin-bottom: var(--byz-space-6);
  }

  &__icon {
    font-size: 3rem;
    line-height: 1;
    color: var(--byz-color-accent);
  }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-2xl);
    font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-primary);
    margin: 0 0 var(--byz-space-3);
    line-height: 1.2;
  }

  &__description {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-base);
    color: var(--byz-color-text-muted);
    max-width: 28rem;
    margin: 0 0 var(--byz-space-8);
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--byz-space-3);
    flex-wrap: wrap;
  }
}
</style>
