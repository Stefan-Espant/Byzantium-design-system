<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'ByzPagination' })

interface Props {
  modelValue: number
  total: number
  perPage?: number
  siblings?: number
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10,
  siblings: 1
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const pages = computed<Array<number | '...'>>(() => {
  const total = totalPages.value
  const current = props.modelValue
  const siblings = props.siblings

  if (total <= 1) return [1]

  const rangeStart = Math.max(2, current - siblings)
  const rangeEnd = Math.min(total - 1, current + siblings)

  const items: Array<number | '...'> = [1]

  if (rangeStart > 2) {
    items.push('...')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    items.push(i)
  }

  if (rangeEnd < total - 1) {
    items.push('...')
  }

  if (total > 1) {
    items.push(total)
  }

  return items
})

function goTo(page: number) {
  if (page < 1 || page > totalPages.value || page === props.modelValue) return
  emit('update:modelValue', page)
}
</script>

<template>
  <nav class="byz-pagination" role="navigation" aria-label="Paginering">
    <!-- Previous -->
    <button
      class="byz-pagination__btn byz-pagination__btn--nav"
      :disabled="modelValue <= 1"
      aria-label="Vorige pagina"
      @click="goTo(modelValue - 1)"
    >
      &#8249;
    </button>

    <!-- Page numbers -->
    <template v-for="(page, index) in pages" :key="index">
      <span v-if="page === '...'" class="byz-pagination__ellipsis" aria-hidden="true">
        &hellip;
      </span>
      <button
        v-else
        class="byz-pagination__btn byz-pagination__btn--page"
        :class="{ 'byz-pagination__btn--active': page === modelValue }"
        :aria-current="page === modelValue ? 'page' : undefined"
        :aria-label="`Pagina ${page}`"
        @click="goTo(page as number)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      class="byz-pagination__btn byz-pagination__btn--nav"
      :disabled="modelValue >= totalPages"
      aria-label="Volgende pagina"
      @click="goTo(modelValue + 1)"
    >
      &#8250;
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.byz-pagination {
  display: flex;
  align-items: center;
  gap: var(--byz-space-1);
  font-family: var(--byz-font-sans);

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 var(--byz-space-2);
    border: 1px solid var(--byz-color-border);
    border-radius: 6px;
    background: transparent;
    color: var(--byz-color-text-secondary);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    cursor: pointer;
    transition:
      background var(--byz-duration-fast) var(--byz-ease-default),
      color var(--byz-duration-fast) var(--byz-ease-default),
      border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      color: var(--byz-color-text-primary);
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &--nav {
      font-size: var(--byz-text-base);
      font-weight: var(--byz-font-medium);
    }

    &--active {
      background: linear-gradient(135deg, var(--byz-brand-500) 0%, var(--byz-brand-400) 100%);
      border-color: transparent;
      color: #fff;
      font-weight: var(--byz-font-semibold);

      &:hover {
        background: linear-gradient(135deg, var(--byz-brand-400) 0%, var(--byz-brand-500) 100%);
        color: #fff;
      }
    }
  }

  &__ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    color: var(--byz-color-text-muted);
    font-size: var(--byz-text-sm);
    user-select: none;
  }
}
</style>
