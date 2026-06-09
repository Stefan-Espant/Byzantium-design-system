<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzRating' })

  interface Props {
    modelValue?: number
    max?: number
    readonly?: boolean
    size?: 'sm' | 'md' | 'lg'
    ariaLabel?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    max: 5,
    readonly: false,
    size: 'md',
  })

  const emit = defineEmits<{
    'update:modelValue': [value: number]
  }>()

  const stars = computed(() =>
    Array.from({ length: props.max }, (_, i) => i + 1)
  )

  function select(value: number) {
    if (!props.readonly) emit('update:modelValue', value)
  }
</script>

<template>
  <div
    :class="['byz-rating', `byz-rating--${size}`, { 'byz-rating--readonly': readonly }]"
    :role="readonly ? 'img' : 'radiogroup'"
    :aria-label="ariaLabel ?? `${modelValue} van ${max} sterren`"
  >
    <component
      :is="readonly ? 'span' : 'button'"
      v-for="star in stars"
      :key="star"
      :class="['byz-rating__star', { 'byz-rating__star--filled': star <= modelValue }]"
      v-bind="readonly ? {} : { type: 'button', 'aria-label': `${star} ster${star !== 1 ? 'ren' : ''}`, 'aria-pressed': star <= modelValue }"
      @click="select(star)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.byz-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--byz-space-1);

  &--sm  { --byz-rating-size: 1rem; }
  &--md  { --byz-rating-size: 1.5rem; }
  &--lg  { --byz-rating-size: 2rem; }

  &--readonly .byz-rating__star {
    cursor: default;
  }

  &__star {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--byz-rating-size);
    height: var(--byz-rating-size);
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--byz-color-border);
    transition:
      color var(--byz-duration-fast) var(--byz-ease-default),
      transform var(--byz-duration-fast) var(--byz-ease-bounce);

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      transition: fill var(--byz-duration-fast) var(--byz-ease-default);
    }

    &--filled {
      color: var(--byz-brand-400);
      svg { fill: var(--byz-brand-400); }
    }

    &:hover:not(:disabled),
    &:focus-visible {
      color: var(--byz-brand-300);
      transform: scale(1.15);
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
}
</style>
