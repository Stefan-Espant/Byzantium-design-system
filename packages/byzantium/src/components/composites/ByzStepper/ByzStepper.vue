<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'ByzStepper' })

  interface Step {
    id: string
    label: string
    description?: string
  }

  interface Props {
    steps: Step[]
    modelValue: string
    completedSteps?: string[]
    orientation?: 'horizontal' | 'vertical'
  }

  const props = withDefaults(defineProps<Props>(), {
    completedSteps: () => [],
    orientation: 'horizontal'
  })

  const emit = defineEmits<{ 'update:modelValue': [id: string] }>()

  function stepState(id: string): 'completed' | 'active' | 'upcoming' {
    if (props.completedSteps.includes(id)) return 'completed'
    if (id === props.modelValue) return 'active'
    return 'upcoming'
  }

  function stepNumber(index: number): number {
    return index + 1
  }

  function isConnectorCompleted(index: number): boolean {
    // The connector after step[index] is "completed" when step[index] is completed
    const id = props.steps[index]?.id
    return id ? props.completedSteps.includes(id) : false
  }

  function selectStep(id: string) {
    emit('update:modelValue', id)
  }

  const isVertical = computed(() => props.orientation === 'vertical')
</script>

<template>
  <div
    class="byz-stepper"
    :class="[
      `byz-stepper--${orientation}`,
    ]"
    :aria-label="'Progress steps'"
  >
    <template v-for="(step, index) in steps" :key="step.id">
      <!-- Step item -->
      <div
        class="byz-stepper__item"
        :class="[`byz-stepper__item--${stepState(step.id)}`]"
        :aria-current="step.id === modelValue ? 'step' : undefined"
      >
        <!-- Circle + label wrapper -->
        <button
          class="byz-stepper__trigger"
          :aria-label="`Step ${stepNumber(index)}: ${step.label}`"
          @click="selectStep(step.id)"
        >
          <!-- Circle -->
          <span
            class="byz-stepper__circle"
            :class="[`byz-stepper__circle--${stepState(step.id)}`]"
            aria-hidden="true"
          >
            <template v-if="stepState(step.id) === 'completed'">
              <svg
                class="byz-stepper__check"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 5l3.5 3.5L11 1"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </template>
            <template v-else>
              <span class="byz-stepper__number">{{ stepNumber(index) }}</span>
            </template>
          </span>

          <!-- Label block -->
          <span class="byz-stepper__label-block">
            <span class="byz-stepper__label">{{ step.label }}</span>
            <span
              v-if="step.description && step.id === modelValue"
              class="byz-stepper__description"
            >
              {{ step.description }}
            </span>
          </span>
        </button>
      </div>

      <!-- Connector line (not after last step) -->
      <div
        v-if="index < steps.length - 1"
        class="byz-stepper__connector"
        :class="[
          isConnectorCompleted(index)
            ? 'byz-stepper__connector--completed'
            : 'byz-stepper__connector--upcoming'
        ]"
        aria-hidden="true"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.byz-stepper {
  display: flex;
  align-items: flex-start;

  // ── Horizontal layout ──────────────────────────────────────────────────────
  &--horizontal {
    flex-direction: row;
    align-items: center;

    .byz-stepper__item {
      flex-shrink: 0;
    }

    .byz-stepper__trigger {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .byz-stepper__label-block {
      align-items: center;
    }

    .byz-stepper__connector {
      flex: 1;
      height: 2px;
      min-width: var(--byz-space-6);
      margin: 0 var(--byz-space-2);
      // vertically center the line with the circles
      align-self: flex-start;
      margin-top: 15px; // half of 32px circle - 1px (half line height)
    }
  }

  // ── Vertical layout ────────────────────────────────────────────────────────
  &--vertical {
    flex-direction: column;
    align-items: stretch;

    .byz-stepper__item {
      position: relative;
    }

    .byz-stepper__trigger {
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
    }

    .byz-stepper__label-block {
      align-items: flex-start;
      padding-top: var(--byz-space-1);
    }

    .byz-stepper__connector {
      width: 2px;
      min-height: var(--byz-space-6);
      margin: var(--byz-space-1) 0;
      // align connector under the circle center (circle is 32px, left margin on trigger = 0)
      margin-left: 15px; // half of 32px circle - 1px (half line width)
    }
  }

  // ── Step item ──────────────────────────────────────────────────────────────
  &__item {
    display: flex;
  }

  // ── Trigger (clickable area) ───────────────────────────────────────────────
  &__trigger {
    display: inline-flex;
    gap: var(--byz-space-3);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: var(--byz-font-sans);
    text-decoration: none;

    &:focus-visible {
      outline: 2px solid var(--byz-color-accent);
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  // ── Circle ─────────────────────────────────────────────────────────────────
  &__circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    transition:
      background var(--byz-duration-normal) var(--byz-ease-default),
      border-color var(--byz-duration-normal) var(--byz-ease-default);

    &--completed,
    &--active {
      background: linear-gradient(135deg, var(--byz-brand-500), var(--byz-brand-400));
      border: none;
      color: #fff;
    }

    &--upcoming {
      background: transparent;
      border: 2px solid var(--byz-color-border);
      color: var(--byz-color-text-muted);
    }
  }

  // ── Check icon ─────────────────────────────────────────────────────────────
  &__check {
    width: 12px;
    height: 10px;
    color: #fff;
  }

  // ── Step number ────────────────────────────────────────────────────────────
  &__number {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    line-height: 1;
  }

  // ── Label block ────────────────────────────────────────────────────────────
  &__label-block {
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-1);
  }

  // ── Label ──────────────────────────────────────────────────────────────────
  &__label {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    line-height: 1;
    transition: color var(--byz-duration-normal) var(--byz-ease-default);

    .byz-stepper__item--completed & {
      color: var(--byz-color-text-secondary);
      font-weight: var(--byz-font-medium);
    }

    .byz-stepper__item--active & {
      color: var(--byz-color-text-primary);
      font-weight: var(--byz-font-bold);
    }

    .byz-stepper__item--upcoming & {
      color: var(--byz-color-text-muted);
      font-weight: var(--byz-font-medium);
    }
  }

  // ── Description ────────────────────────────────────────────────────────────
  &__description {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-secondary);
    font-weight: var(--byz-font-medium);
    line-height: 1.4;
  }

  // ── Connector ──────────────────────────────────────────────────────────────
  &__connector {
    border-radius: 1px;
    transition: background var(--byz-duration-normal) var(--byz-ease-default);

    &--completed {
      background: linear-gradient(
        var(--_connector-direction, 90deg),
        var(--byz-brand-500),
        var(--byz-brand-400)
      );
    }

    &--upcoming {
      background: var(--byz-color-border);
    }
  }

  // Set gradient direction per orientation
  &--vertical .byz-stepper__connector {
    --_connector-direction: 180deg;
  }

  &--horizontal .byz-stepper__connector {
    --_connector-direction: 90deg;
  }
}
</style>
