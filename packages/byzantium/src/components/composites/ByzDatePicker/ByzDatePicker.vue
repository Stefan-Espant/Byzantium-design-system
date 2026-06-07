<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

defineOptions({ name: 'ByzDatePicker' })

interface Props {
  modelValue?: string
  label: string
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
  error?: string
  hint?: string
  required?: boolean
  locale?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'DD-MM-JJJJ',
  disabled: false,
  required: false,
  locale: 'nl-NL',
})

const emit = defineEmits<{
  'update:modelValue': [date: string]
}>()

const id = `byz-datepicker-${Math.random().toString(36).slice(2, 9)}`
const errorId = `${id}-error`
const hintId = `${id}-hint`

const isOpen = ref(false)
const inputEl = ref<HTMLInputElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)

// Calendar state
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth()) // 0-based
const focusedDate = ref<string | null>(null)

// Panel position
const panelStyle = ref<Record<string, string>>({})

// Convert ISO string (YYYY-MM-DD) to display format (DD-MM-YYYY)
function isoToDisplay(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}-${m}-${y}`
}

// Convert display format to ISO
function displayToIso(display: string): string {
  if (!display) return ''
  const [d, m, y] = display.split('-')
  if (!d || !m || !y) return ''
  return `${y}-${m}-${d}`
}

const displayValue = computed(() => isoToDisplay(props.modelValue ?? ''))

function parseIso(iso: string): Date | null {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
}

function toIso(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const todayIso = toIso(new Date())

// Day names Mon–Sun in Dutch
const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

interface CalendarDay {
  iso: string
  day: number
  currentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
}

const calendarDays = computed((): CalendarDay[] => {
  const year = viewYear.value
  const month = viewMonth.value

  // First day of month
  const firstDay = new Date(year, month, 1)
  // Day of week 0=Sun..6=Sat → convert to Mon-based (0=Mon..6=Sun)
  let startDow = firstDay.getDay() // 0=Sun
  startDow = (startDow + 6) % 7    // 0=Mon

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const days: CalendarDay[] = []

  // Previous month days
  for (let i = startDow - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const iso = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({
      iso,
      day: d,
      currentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === (props.modelValue ?? ''),
      isDisabled: isDayDisabled(iso),
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({
      iso,
      day: d,
      currentMonth: true,
      isToday: iso === todayIso,
      isSelected: iso === (props.modelValue ?? ''),
      isDisabled: isDayDisabled(iso),
    })
  }

  // Next month days to fill up to 42 cells (6 rows)
  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    const iso = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({
      iso,
      day: d,
      currentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === (props.modelValue ?? ''),
      isDisabled: isDayDisabled(iso),
    })
  }

  return days
})

function isDayDisabled(iso: string): boolean {
  if (props.min && iso < props.min) return true
  if (props.max && iso > props.max) return true
  return false
}

const monthLabel = computed(() => {
  const d = new Date(viewYear.value, viewMonth.value, 1)
  return d.toLocaleDateString(props.locale, { month: 'long', year: 'numeric' })
})

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function selectDay(day: CalendarDay) {
  if (day.isDisabled) return
  emit('update:modelValue', day.iso)
  close()
}

function computePanelPosition() {
  if (!triggerEl.value) return
  const rect = triggerEl.value.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const panelHeight = 340
  if (spaceBelow >= panelHeight || spaceBelow > rect.top) {
    panelStyle.value = {
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${rect.left + window.scrollX}px`,
    }
  } else {
    panelStyle.value = {
      top: `${rect.top + window.scrollY - panelHeight - 4}px`,
      left: `${rect.left + window.scrollX}px`,
    }
  }
}

function open() {
  if (props.disabled) return
  // Initialize view to selected date or today
  const selected = parseIso(props.modelValue ?? '')
  const base = selected ?? new Date()
  viewYear.value = base.getFullYear()
  viewMonth.value = base.getMonth()
  focusedDate.value = props.modelValue ?? todayIso

  computePanelPosition()
  isOpen.value = true
}

function close() {
  isOpen.value = false
  focusedDate.value = null
}

function toggle() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

// Keyboard navigation
function handlePanelKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return

  const current = focusedDate.value ?? (props.modelValue ?? todayIso)

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (current && !isDayDisabled(current)) {
      emit('update:modelValue', current)
      close()
    }
    return
  }

  let date = parseIso(current) ?? new Date()

  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    date.setDate(date.getDate() - 1)
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    date.setDate(date.getDate() + 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    date.setDate(date.getDate() - 7)
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    date.setDate(date.getDate() + 7)
  } else {
    return
  }

  const newIso = toIso(date)
  focusedDate.value = newIso
  // Update view if navigated out of current month
  viewYear.value = date.getFullYear()
  viewMonth.value = date.getMonth()
}

function closeOnOutside(e: MouseEvent) {
  const target = e.target as Node
  if (
    panelEl.value && !panelEl.value.contains(target) &&
    triggerEl.value && !triggerEl.value.contains(target)
  ) {
    close()
  }
}

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => {
      document.addEventListener('mousedown', closeOnOutside)
      document.addEventListener('keydown', handlePanelKeydown)
    })
  } else {
    document.removeEventListener('mousedown', closeOnOutside)
    document.removeEventListener('keydown', handlePanelKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousedown', closeOnOutside)
  document.removeEventListener('keydown', handlePanelKeydown)
})
</script>

<template>
  <div :class="['byz-datepicker', { 'byz-datepicker--error': error, 'byz-datepicker--disabled': disabled }]">
    <label :for="id" class="byz-datepicker__label">
      {{ label }}
      <span v-if="required" class="byz-datepicker__required" aria-hidden="true">*</span>
    </label>

    <div ref="triggerEl" class="byz-datepicker__input-wrap">
      <input
        :id="id"
        ref="inputEl"
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-describedby="[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined"
        :aria-invalid="!!error"
        :aria-haspopup="'dialog'"
        :aria-expanded="isOpen"
        class="byz-datepicker__field"
        readonly
        @click="open"
      />
      <button
        type="button"
        class="byz-datepicker__icon-btn"
        :disabled="disabled"
        :aria-label="'Kalender openen'"
        tabindex="-1"
        @click="toggle"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </div>

    <span v-if="hint && !error" :id="hintId" class="byz-datepicker__hint">{{ hint }}</span>
    <span v-if="error" :id="errorId" class="byz-datepicker__error" role="alert">{{ error }}</span>

    <!-- Calendar panel -->
    <Teleport to="body">
      <Transition name="byz-datepicker-fade">
        <div
          v-if="isOpen"
          ref="panelEl"
          class="byz-datepicker__panel"
          :style="panelStyle"
          role="dialog"
          aria-label="Kalender"
          aria-modal="true"
        >
          <!-- Month navigation header -->
          <div class="byz-datepicker__nav">
            <button type="button" class="byz-datepicker__nav-btn" aria-label="Vorige maand" @click="prevMonth">‹</button>
            <span class="byz-datepicker__month-label">{{ monthLabel }}</span>
            <button type="button" class="byz-datepicker__nav-btn" aria-label="Volgende maand" @click="nextMonth">›</button>
          </div>

          <!-- Day headers -->
          <div class="byz-datepicker__grid">
            <div
              v-for="name in dayNames"
              :key="name"
              class="byz-datepicker__day-name"
            >
              {{ name }}
            </div>

            <!-- Day cells -->
            <button
              v-for="day in calendarDays"
              :key="day.iso"
              type="button"
              :class="[
                'byz-datepicker__day',
                {
                  'byz-datepicker__day--other-month': !day.currentMonth,
                  'byz-datepicker__day--today': day.isToday,
                  'byz-datepicker__day--selected': day.isSelected,
                  'byz-datepicker__day--focused': day.iso === focusedDate,
                  'byz-datepicker__day--disabled': day.isDisabled,
                },
              ]"
              :disabled="day.isDisabled"
              :aria-pressed="day.isSelected"
              :aria-label="day.iso"
              @click="selectDay(day)"
            >
              {{ day.day }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.byz-datepicker {
  display: flex;
  flex-direction: column;
  gap: var(--byz-space-2);

  &__label {
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-primary);
  }

  &__required {
    color: var(--byz-color-error, #e84050);
    margin-left: var(--byz-space-1);
  }

  &__input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    min-height: 44px;
    padding: var(--byz-space-2) var(--byz-space-10) var(--byz-space-2) var(--byz-space-3);
    border: 2px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background-color: var(--byz-color-background);
    color: var(--byz-color-text-primary);
    font-size: var(--byz-text-base);
    font-family: var(--byz-font-sans);
    cursor: pointer;
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:focus {
      outline: none;
      border-color: var(--byz-color-focus);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &::placeholder {
      color: var(--byz-color-text-muted);
    }
  }

  &--error &__field {
    border-color: var(--byz-color-error, #e84050);
  }

  &__icon-btn {
    position: absolute;
    right: var(--byz-space-2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 0.25rem;
    color: var(--byz-color-text-secondary);
    cursor: pointer;
    transition: color var(--byz-duration-fast) var(--byz-ease-default),
                background var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(:disabled) {
      color: var(--byz-color-text-primary);
      background: rgba(255, 255, 255, 0.06);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__hint {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-secondary);
  }

  &__error {
    font-size: var(--byz-text-sm);
    color: var(--byz-color-error, #e84050);
  }

  // Calendar panel (rendered via Teleport, not scoped to parent)
}

// Panel styles are not scoped because it's in Teleport
:global(.byz-datepicker__panel) {
  position: absolute;
  z-index: var(--byz-z-dropdown, 1000);
  width: 288px;
  background: var(--byz-color-surface-raised);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  box-shadow: var(--byz-shadow-lg, 0 16px 48px rgba(0, 0, 0, 0.5));
  padding: var(--byz-space-4);
  user-select: none;
}

:global(.byz-datepicker__nav) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--byz-space-3);
}

:global(.byz-datepicker__nav-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: var(--byz-color-text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color var(--byz-duration-fast) var(--byz-ease-default),
              background var(--byz-duration-fast) var(--byz-ease-default);

  &:hover {
    color: var(--byz-color-text-primary);
    background: rgba(255, 255, 255, 0.06);
  }
}

:global(.byz-datepicker__month-label) {
  font-family: var(--byz-font-serif);
  font-weight: 700;
  font-size: var(--byz-text-base);
  color: var(--byz-color-text-primary);
  text-transform: capitalize;
}

:global(.byz-datepicker__grid) {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

:global(.byz-datepicker__day-name) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: var(--byz-text-xs);
  font-weight: var(--byz-font-semibold);
  color: var(--byz-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

:global(.byz-datepicker__day) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--byz-color-text-primary);
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-sm);
  cursor: pointer;
  transition: background var(--byz-duration-fast) var(--byz-ease-default),
              color var(--byz-duration-fast) var(--byz-ease-default);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
  }
}

:global(.byz-datepicker__day--other-month) {
  color: var(--byz-color-text-muted);
  opacity: 0.5;
}

:global(.byz-datepicker__day--today) {
  box-shadow: 0 0 0 2px var(--byz-brand-400, #e84050);
}

:global(.byz-datepicker__day--selected) {
  background: linear-gradient(135deg, var(--byz-brand-500, #c01030), var(--byz-brand-400, #e84050));
  color: #fff;
  font-weight: var(--byz-font-semibold);

  &:hover {
    background: linear-gradient(135deg, var(--byz-brand-400, #e84050), var(--byz-brand-500, #c01030));
  }
}

:global(.byz-datepicker__day--focused):not(:global(.byz-datepicker__day--selected)) {
  outline: 2px solid var(--byz-color-focus, var(--byz-brand-400, #e84050));
  outline-offset: 1px;
}

:global(.byz-datepicker__day--disabled) {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

// Transition
:global(.byz-datepicker-fade-enter-active),
:global(.byz-datepicker-fade-leave-active) {
  transition: opacity var(--byz-duration-fast) var(--byz-ease-default),
              transform var(--byz-duration-fast) var(--byz-ease-default);
}

:global(.byz-datepicker-fade-enter-from),
:global(.byz-datepicker-fade-leave-to) {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
