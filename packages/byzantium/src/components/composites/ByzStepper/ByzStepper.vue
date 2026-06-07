<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../../../composables/useLocale'

defineOptions({ name: 'ByzStepper' })

export type StepStatus = 'completed' | 'active' | 'pending' | 'error'

export interface ByzStep {
  label:        string
  description?: string
  status?:      StepStatus
}

interface Props {
  steps:      ByzStep[]
  modelValue: number
  linear?:    boolean
  vertical?:  boolean
}

const props = withDefaults(defineProps<Props>(), {
  linear:   true,
  vertical: false,
})

const emit = defineEmits<{
  'update:modelValue': [step: number]
  complete: []
}>()

const { t } = useLocale()

const isFirst = computed(() => props.modelValue === 0)
const isLast  = computed(() => props.modelValue === props.steps.length - 1)

function stepStatus(index: number): StepStatus {
  if (props.steps[index].status) return props.steps[index].status!
  if (index < props.modelValue)   return 'completed'
  if (index === props.modelValue) return 'active'
  return 'pending'
}

function goTo(index: number) {
  if (props.linear && index > props.modelValue + 1) return
  emit('update:modelValue', index)
}

function next() {
  if (isLast.value) { emit('complete'); return }
  emit('update:modelValue', props.modelValue + 1)
}

function prev() {
  if (!isFirst.value) emit('update:modelValue', props.modelValue - 1)
}
</script>

<template>
  <div class="byz-stepper" :class="{ 'byz-stepper--vertical': vertical }">

    <div class="byz-stepper__track" role="list">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="byz-stepper__step"
        :class="`byz-stepper__step--${stepStatus(i)}`"
        role="listitem"
      >
        <button
          class="byz-stepper__node"
          :aria-label="`${t('step')} ${i + 1} ${t('of')} ${steps.length}: ${step.label}`"
          :aria-current="i === modelValue ? 'step' : undefined"
          :disabled="linear && i > modelValue + 1"
          @click="goTo(i)"
        >
          <svg v-if="stepStatus(i) === 'completed'" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else-if="stepStatus(i) === 'error'" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 4v4M7 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span v-else aria-hidden="true">{{ i + 1 }}</span>
        </button>

        <div class="byz-stepper__label">
          <span class="byz-stepper__label-title">{{ step.label }}</span>
          <span v-if="step.description" class="byz-stepper__label-desc">{{ step.description }}</span>
        </div>

        <div v-if="i < steps.length - 1" class="byz-stepper__connector" aria-hidden="true" />
      </div>
    </div>

    <div class="byz-stepper__content">
      <slot :step="modelValue" :step-data="steps[modelValue]" />
    </div>

    <div class="byz-stepper__actions">
      <slot name="actions" :prev="prev" :next="next" :is-first="isFirst" :is-last="isLast">
        <button class="byz-stepper__btn byz-stepper__btn--prev" :disabled="isFirst" @click="prev">
          ← {{ t('previous') }}
        </button>
        <span class="byz-stepper__progress">
          {{ t('step') }} {{ modelValue + 1 }} {{ t('of') }} {{ steps.length }}
        </span>
        <button class="byz-stepper__btn byz-stepper__btn--next" @click="next">
          {{ isLast ? t('confirm') : t('next') }} →
        </button>
      </slot>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.byz-stepper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__track {
    display: flex;
    align-items: flex-start;
    position: relative;
  }

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    gap: 0.5rem;
  }

  &__node {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--byz-color-border);
    background: var(--byz-color-surface);
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    &:disabled { cursor: not-allowed; opacity: 0.5; }
  }

  &__step--active &__node {
    border-color: var(--byz-brand-500);
    background: var(--byz-brand-500);
    color: #fff;
    box-shadow: 0 0 0 4px rgba(192, 16, 48, 0.2);
  }

  &__step--completed &__node {
    border-color: var(--byz-brand-500);
    background: var(--byz-brand-500);
    color: #fff;
  }

  &__step--error &__node {
    border-color: var(--byz-color-error, #dc2626);
    background: var(--byz-color-error, #dc2626);
    color: #fff;
  }

  &__connector {
    position: absolute;
    top: 1rem;
    left: 50%;
    width: 100%;
    height: 2px;
    background: var(--byz-color-border);
    z-index: 0;

    .byz-stepper__step--completed & {
      background: linear-gradient(90deg, var(--byz-brand-500), var(--byz-color-border));
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.125rem;
  }

  &__label-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--byz-color-text);
    white-space: nowrap;
    .byz-stepper__step--pending & { color: var(--byz-color-text-muted); }
  }

  &__label-desc {
    font-size: 0.7rem;
    color: var(--byz-color-text-muted);
  }

  &__content {
    background: var(--byz-color-surface);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.75rem;
    padding: 1.5rem;
    min-height: 8rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__progress {
    font-size: 0.8rem;
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono);
  }

  &__btn {
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid var(--byz-color-border);
    background: var(--byz-color-surface-raised);
    color: var(--byz-color-text);

    &:hover:not(:disabled) { border-color: var(--byz-brand-500); color: var(--byz-brand-500); }
    &:disabled { opacity: 0.4; cursor: not-allowed; }

    &--next {
      background: var(--byz-brand-500);
      border-color: var(--byz-brand-500);
      color: #fff;
      &:hover:not(:disabled) { background: var(--byz-brand-600, #9a0020); color: #fff; }
    }
  }

  // ── Vertical ─────────────────────────────────────────────────────────────
  &--vertical &__track { flex-direction: column; }

  &--vertical &__step {
    flex-direction: row;
    align-items: flex-start;
    flex: none;
    gap: 1rem;
    padding-bottom: 1.5rem;
  }

  &--vertical &__label { align-items: flex-start; text-align: left; }

  &--vertical &__connector {
    top: 2rem;
    left: 1rem;
    width: 2px;
    height: calc(100% - 1rem);
  }
}
</style>
