<script setup lang="ts">
  import { ref, computed } from 'vue'

  defineOptions({ name: 'ByzAvatar' })

  interface Props {
    src?: string
    alt?: string
    name?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    shape?: 'circle' | 'square'
  }

  const props = withDefaults(defineProps<Props>(), {
    alt: '',
    size: 'md',
    shape: 'circle'
  })

  const imageError = ref(false)

  const initials = computed<string>(() => {
    if (!props.name) return ''
    const words = props.name.trim().split(/\s+/)
    const letters = words.slice(0, 2).map(w => w[0].toUpperCase())
    return letters.join('')
  })

  const showImage = computed(() => !!props.src && !imageError.value)
  const showInitials = computed(() => !showImage.value && !!initials.value)
  const showFallback = computed(() => !showImage.value && !showInitials.value)

  function onError() {
    imageError.value = true
  }
</script>

<template>
  <span
    :class="[
      'byz-avatar',
      `byz-avatar--${size}`,
      `byz-avatar--${shape}`
    ]"
    role="img"
    :aria-label="alt || name || 'Avatar'"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="alt || name || ''"
      class="byz-avatar__image"
      @error="onError"
    />
    <span v-else-if="showInitials" class="byz-avatar__initials" aria-hidden="true">
      {{ initials }}
    </span>
    <span v-else class="byz-avatar__fallback" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" class="byz-avatar__icon">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.byz-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-family: var(--byz-font-sans);
  font-weight: var(--byz-font-semibold);
  background: linear-gradient(135deg, var(--byz-brand-800, #2d0510) 0%, var(--byz-brand-700, #4a0818) 100%);
  color: var(--byz-brand-300, #f472b6);
  user-select: none;

  // Sizes
  &--sm  { width: 24px;  height: 24px;  font-size: 0.625rem; }
  &--md  { width: 32px;  height: 32px;  font-size: 0.75rem;  }
  &--lg  { width: 40px;  height: 40px;  font-size: 0.9375rem; }
  &--xl  { width: 56px;  height: 56px;  font-size: 1.25rem;  }

  // Shapes
  &--circle { border-radius: 9999px; }
  &--square  { border-radius: 0.375rem; }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__initials {
    line-height: 1;
    letter-spacing: 0.02em;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--byz-brand-400, #e84050);
  }

  &__icon {
    width: 60%;
    height: 60%;
  }
}
</style>
