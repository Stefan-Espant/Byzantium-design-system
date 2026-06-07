<script setup lang="ts">
  defineOptions({ name: 'ByzHero' })

  interface Props {
    title: string
    subtitle?: string
    align?: 'left' | 'center' | 'right'
  }

  withDefaults(defineProps<Props>(), {
    align: 'center'
  })
</script>

<template>
  <section :class="['byz-hero', `byz-hero--${align}`]" aria-labelledby="byz-hero-title">
    <div class="byz-hero__content">
      <h1 id="byz-hero-title" class="byz-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="byz-hero__subtitle">{{ subtitle }}</p>
      <div v-if="$slots.default" class="byz-hero__actions"><slot /></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.byz-hero {
  padding: var(--byz-space-20) var(--byz-space-8);
  background-color: var(--byz-color-surface);

  &__content { max-width: 48rem; margin: 0 auto; }
  &__title   { font-size: var(--byz-text-4xl); font-weight: var(--byz-font-bold); line-height: var(--byz-leading-tight); }
  &__subtitle { font-size: var(--byz-text-xl); color: var(--byz-color-text-secondary); margin-top: var(--byz-space-4); }
  &__actions { display: flex; gap: var(--byz-space-4); margin-top: var(--byz-space-8); flex-wrap: wrap; }

  &--left   { text-align: left;   .byz-hero__actions { justify-content: flex-start; } }
  &--center { text-align: center; .byz-hero__actions { justify-content: center; } }
  &--right  { text-align: right;  .byz-hero__actions { justify-content: flex-end; } }
}
</style>
