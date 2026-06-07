<script setup lang="ts">
  defineOptions({ name: 'ByzLink' })

  interface Props {
    href: string
    external?: boolean
    variant?: 'default' | 'muted' | 'accent'
    underline?: 'always' | 'hover' | 'none'
  }

  withDefaults(defineProps<Props>(), {
    external: false,
    variant: 'default',
    underline: 'hover'
  })
</script>

<template>
  <a
    :href="href"
    :class="[
      'byz-link',
      `byz-link--${variant}`,
      `byz-link--underline-${underline}`
    ]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="external" aria-hidden="true"> ↗</span>
  </a>
</template>

<style lang="scss" scoped>
.byz-link {
  font-family: var(--byz-font-sans);
  cursor: pointer;
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default);

  &:focus-visible {
    outline: 2px solid var(--byz-color-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }

  // Variants
  &--default {
    color: var(--byz-color-text-primary);
  }

  &--muted {
    color: var(--byz-color-text-muted);
  }

  &--accent {
    color: var(--byz-color-accent);
  }

  // Underline behavior
  &--underline-always {
    text-decoration: underline;
  }

  &--underline-hover {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &--underline-none {
    text-decoration: none;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
