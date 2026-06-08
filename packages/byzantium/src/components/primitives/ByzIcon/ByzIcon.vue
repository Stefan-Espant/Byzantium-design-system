<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { resolveByzIconName, type ByzIconName } from './icons'
  import { ensureByzIconSprite } from './sprite'

  defineOptions({ name: 'ByzIcon' })

  interface Props {
    name?: ByzIconName | string
    size?: 'sm' | 'md' | 'lg' | number
    ariaLabel?: string
    strokeWidth?: number | string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: undefined,
    size: 'md',
    strokeWidth: 1.8,
  })

  const iconName = computed(() => resolveByzIconName(props.name))
  const iconHref = computed(() => iconName.value ? `#byz-icon-${iconName.value}` : '')
  const pixelSize = computed(() => {
    if (props.size === 'sm') return 16
    if (props.size === 'md') return 24
    if (props.size === 'lg') return 32
    return props.size
  })

  onMounted(() => {
    ensureByzIconSprite()
  })
</script>

<template>
  <span
    :class="['byz-icon', `byz-icon--${size}`]"
  >
    <svg
      v-if="iconName"
      class="byz-icon__svg"
      xmlns="http://www.w3.org/2000/svg"
      :width="pixelSize"
      :height="pixelSize"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      color="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :aria-label="ariaLabel"
      :aria-hidden="ariaLabel ? undefined : 'true'"
      :role="ariaLabel ? 'img' : undefined"
      focusable="false"
    >
      <use :href="iconHref" :xlink:href="iconHref" />
    </svg>
    <slot v-else />
  </span>
</template>

<style lang="scss" scoped>
.byz-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  flex-shrink: 0;

  &--sm { width: 1rem;    height: 1rem; }
  &--md { width: 1.5rem;  height: 1.5rem; }
  &--lg { width: 2rem;    height: 2rem; }

  &__svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }
}
</style>
