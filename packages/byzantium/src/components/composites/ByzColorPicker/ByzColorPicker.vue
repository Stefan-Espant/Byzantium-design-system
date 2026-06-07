<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLocale } from '../../../composables/useLocale'

defineOptions({ name: 'ByzColorPicker' })

interface Props {
  modelValue?: string
  showAlpha?:  boolean
  swatches?:   string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '#c01030',
  showAlpha:  false,
  swatches:   () => [
    '#c01030', '#e84050', '#ff7070', '#ffaaaa',
    '#2563eb', '#16a34a', '#d97706', '#7c3aed',
    '#0e0305', '#160608', '#320f14', '#ffffff',
  ],
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const { t } = useLocale()

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const [initH, initS, initL] = hexToHsl(props.modelValue || '#c01030')
const hue        = ref(initH)
const saturation = ref(initS)
const lightness  = ref(initL)
const hexInput   = ref(props.modelValue || '#c01030')
const hexError   = ref(false)

const currentHex = computed(() => hslToHex(hue.value, saturation.value, lightness.value))

const gradientHue        = computed(() => `linear-gradient(to right, hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%), hsl(90,100%,50%), hsl(120,100%,50%), hsl(150,100%,50%), hsl(180,100%,50%), hsl(210,100%,50%), hsl(240,100%,50%), hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%), hsl(360,100%,50%))`)
const gradientSaturation = computed(() => `linear-gradient(to right, hsl(${hue.value},0%,${lightness.value}%), hsl(${hue.value},100%,${lightness.value}%))`)
const gradientLightness  = computed(() => `linear-gradient(to right, hsl(${hue.value},${saturation.value}%,0%), hsl(${hue.value},${saturation.value}%,50%), hsl(${hue.value},${saturation.value}%,100%))`)

watch(currentHex, (val) => {
  hexInput.value = val
  emit('update:modelValue', val)
  emit('change', val)
})

function onHexInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  hexInput.value = val
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    hexError.value = false
    const [h, s, l] = hexToHsl(val)
    hue.value = h; saturation.value = s; lightness.value = l
  } else {
    hexError.value = true
  }
}

function pickSwatch(hex: string) {
  const [h, s, l] = hexToHsl(hex)
  hue.value = h; saturation.value = s; lightness.value = l
}
</script>

<template>
  <div class="byz-colorpicker">

    <div class="byz-colorpicker__preview" :style="{ background: currentHex }" />

    <div class="byz-colorpicker__sliders">
      <label class="byz-colorpicker__label">
        <span>{{ t('hue') }}</span>
        <input
          v-model.number="hue"
          type="range" min="0" max="360"
          class="byz-colorpicker__range"
          :style="{ '--track-gradient': gradientHue }"
          :aria-label="t('hue')"
        />
        <span class="byz-colorpicker__value">{{ hue }}°</span>
      </label>

      <label class="byz-colorpicker__label">
        <span>{{ t('saturation') }}</span>
        <input
          v-model.number="saturation"
          type="range" min="0" max="100"
          class="byz-colorpicker__range"
          :style="{ '--track-gradient': gradientSaturation }"
          :aria-label="t('saturation')"
        />
        <span class="byz-colorpicker__value">{{ saturation }}%</span>
      </label>

      <label class="byz-colorpicker__label">
        <span>{{ t('lightness') }}</span>
        <input
          v-model.number="lightness"
          type="range" min="0" max="100"
          class="byz-colorpicker__range"
          :style="{ '--track-gradient': gradientLightness }"
          :aria-label="t('lightness')"
        />
        <span class="byz-colorpicker__value">{{ lightness }}%</span>
      </label>
    </div>

    <label class="byz-colorpicker__hex-label">
      <span>{{ t('hex') }}</span>
      <input
        :value="hexInput"
        type="text"
        class="byz-colorpicker__hex"
        :class="{ 'byz-colorpicker__hex--error': hexError }"
        maxlength="7"
        spellcheck="false"
        :aria-label="t('hex')"
        :aria-invalid="hexError"
        @input="onHexInput"
      />
    </label>

    <div v-if="swatches?.length" class="byz-colorpicker__swatches">
      <button
        v-for="swatch in swatches"
        :key="swatch"
        class="byz-colorpicker__swatch"
        :style="{ background: swatch }"
        :aria-label="swatch"
        :aria-pressed="currentHex.toLowerCase() === swatch.toLowerCase()"
        @click="pickSwatch(swatch)"
      />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.byz-colorpicker {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--byz-color-surface);
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  width: 18rem;

  &__preview {
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    transition: background 0.1s;
  }

  &__sliders {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__label {
    display: grid;
    grid-template-columns: 6rem 1fr 3rem;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--byz-color-text-muted);
  }

  &__range {
    -webkit-appearance: none;
    appearance: none;
    height: 0.5rem;
    border-radius: 9999px;
    background: var(--track-gradient);
    cursor: pointer;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: #fff;
      border: 2px solid rgba(0,0,0,0.3);
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      cursor: pointer;
    }
    &:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px rgba(192, 16, 48, 0.4);
    }
  }

  &__value {
    font-family: var(--byz-font-mono);
    font-size: 0.75rem;
    color: var(--byz-color-text);
    text-align: right;
  }

  &__hex-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: var(--byz-color-text-muted);
  }

  &__hex {
    flex: 1;
    background: var(--byz-color-surface-raised);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
    padding: 0.375rem 0.625rem;
    color: var(--byz-color-text);
    font-family: var(--byz-font-mono);
    font-size: 0.875rem;
    transition: border-color 0.15s;

    &:focus { outline: none; border-color: var(--byz-brand-500); }
    &--error { border-color: var(--byz-color-error, #dc2626); }
  }

  &__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  &__swatch {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.15s;

    &:hover { transform: scale(1.15); }
    &[aria-pressed="true"] {
      border-color: #fff;
      box-shadow: 0 0 0 2px var(--byz-brand-500);
    }
  }
}
</style>
