<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ByzNotificationBell' })

interface Props {
  count?: number
  max?: number
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  max: 99,
  pulse: false
})

const emit = defineEmits<{
  click: []
}>()

const badgeLabel = computed(() => {
  if (props.count <= 0) return ''
  return props.count > props.max ? `${props.max}+` : String(props.count)
})

const ariaLabel = computed(() => {
  if (props.count <= 0) return 'Meldingen, geen ongelezen'
  const displayed = props.count > props.max ? `${props.max}+` : props.count
  return `Meldingen, ${displayed} ongelezen`
})
</script>

<template>
  <button
    type="button"
    class="byz-notification-bell"
    :aria-label="ariaLabel"
    @click="emit('click')"
  >
    <!-- Bell icon -->
    <span class="byz-notification-bell__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <!-- Badge -->
    <span
      v-if="count > 0"
      :class="['byz-notification-bell__badge', { 'byz-notification-bell__badge--pulse': pulse }]"
      aria-hidden="true"
    >
      {{ badgeLabel }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.byz-notification-bell {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--byz-color-text-primary);
  transition:
    background-color var(--byz-duration-fast) var(--byz-ease-default),
    color var(--byz-duration-fast) var(--byz-ease-default);

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: var(--byz-color-text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--byz-color-focus);
    outline-offset: 2px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 16px;
    height: 16px;
    padding: 0 3px;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--byz-brand-400, #e84050), var(--byz-brand-500, #c01030));
    color: #ffffff;
    font-family: var(--byz-font-sans);
    font-size: 10px;
    font-weight: var(--byz-font-bold);
    line-height: 16px;
    text-align: center;
    white-space: nowrap;
    border: 1.5px solid var(--byz-color-background);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &--pulse {
      &::after {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 9999px;
        border: 2px solid var(--byz-brand-400, #e84050);
        animation: byz-bell-pulse 1.6s ease-out infinite;
        opacity: 0;

        @media (prefers-reduced-motion: reduce) {
          animation: none;
        }
      }
    }
  }
}

@keyframes byz-bell-pulse {
  0% {
    opacity: 0.7;
    transform: scale(0.9);
  }
  100% {
    opacity: 0;
    transform: scale(1.8);
  }
}
</style>
