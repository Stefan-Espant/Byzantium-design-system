<script setup lang="ts" generic="T extends Record<string, unknown>">
import { ref, computed } from 'vue'
import { useLocale } from '../../../composables/useLocale'

defineOptions({ name: 'ByzDataTable' })

export interface ByzColumn<Row = Record<string, unknown>> {
  key:        string
  label:      string
  sortable?:  boolean
  width?:     string
  align?:     'left' | 'center' | 'right'
  format?:    (value: unknown, row: Row) => string
}

interface Props {
  columns:       ByzColumn<T>[]
  rows:          T[]
  rowKey?:       string
  pageSize?:     number
  searchable?:   boolean
  striped?:      boolean
  stickyHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rowKey:       'id',
  pageSize:     10,
  searchable:   false,
  striped:      true,
  stickyHeader: false,
})

const emit = defineEmits<{
  'row-click': [row: T]
}>()

const { t } = useLocale()

const searchQuery = ref('')
const sortKey     = ref<string | null>(null)
const sortDir     = ref<'asc' | 'desc'>('asc')
const page        = ref(1)

const filtered = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) return props.rows
  const q = searchQuery.value.toLowerCase()
  return props.rows.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(q))
  )
})

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value
  return [...filtered.value].sort((a, b) => {
    const av = a[sortKey.value!]
    const bv = b[sortKey.value!]
    const cmp = av === bv ? 0 : av! > bv! ? 1 : -1
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const totalPages = computed(() => Math.ceil(sorted.value.length / props.pageSize))

const paginated = computed(() => {
  const start = (page.value - 1) * props.pageSize
  return sorted.value.slice(start, start + props.pageSize)
})

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  page.value = 1
}

function cellValue(row: T, col: ByzColumn<T>): string {
  const val = row[col.key]
  return col.format ? col.format(val, row) : String(val ?? '')
}
</script>

<template>
  <div class="byz-datatable">

    <div v-if="searchable" class="byz-datatable__toolbar">
      <input
        v-model="searchQuery"
        class="byz-datatable__search"
        type="search"
        :placeholder="t('search')"
        @input="page = 1"
      />
    </div>

    <div class="byz-datatable__wrapper">
      <table class="byz-datatable__table" :class="{ 'byz-datatable__table--striped': striped }">
        <thead class="byz-datatable__head" :class="{ 'byz-datatable__head--sticky': stickyHeader }">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="byz-datatable__th"
              :class="`byz-datatable__th--${col.align ?? 'left'}`"
              :style="col.width ? { width: col.width } : {}"
              :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined"
            >
              <button
                v-if="col.sortable"
                class="byz-datatable__sort-btn"
                :aria-label="sortDir === 'asc' ? t('sortAsc') : t('sortDesc')"
                @click="toggleSort(col.key)"
              >
                {{ col.label }}
                <span class="byz-datatable__sort-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path :d="sortKey === col.key && sortDir === 'desc' ? 'M2 3l3 4 3-4' : 'M2 7l3-4 3 4'"
                          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </button>
              <span v-else>{{ col.label }}</span>
            </th>
          </tr>
        </thead>

        <tbody class="byz-datatable__body">
          <tr
            v-if="paginated.length === 0"
            class="byz-datatable__empty"
          >
            <td :colspan="columns.length" class="byz-datatable__empty-cell">
              <slot name="empty">{{ t('noData') }}</slot>
            </td>
          </tr>

          <tr
            v-for="(row, ri) in paginated"
            :key="String(row[rowKey] ?? ri)"
            class="byz-datatable__row"
            @click="emit('row-click', row)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="byz-datatable__td"
              :class="`byz-datatable__td--${col.align ?? 'left'}`"
            >
              <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
                {{ cellValue(row, col) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="byz-datatable__pagination">
      <span class="byz-datatable__pagination-info">
        {{ t('rowsPerPage') }}: {{ pageSize }} &nbsp;·&nbsp;
        {{ (page - 1) * pageSize + 1 }}–{{ Math.min(page * pageSize, sorted.length) }} / {{ sorted.length }}
      </span>
      <div class="byz-datatable__pagination-btns">
        <button
          class="byz-datatable__page-btn"
          :disabled="page === 1"
          :aria-label="t('previous')"
          @click="page--"
        >‹</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="byz-datatable__page-btn"
          :class="{ 'byz-datatable__page-btn--active': p === page }"
          :aria-current="p === page ? 'page' : undefined"
          @click="page = p"
        >{{ p }}</button>
        <button
          class="byz-datatable__page-btn"
          :disabled="page === totalPages"
          :aria-label="t('next')"
          @click="page++"
        >›</button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.byz-datatable {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;

  &__toolbar {
    display: flex;
    justify-content: flex-end;
  }

  &__search {
    background: var(--byz-color-surface);
    border: 1px solid var(--byz-color-border);
    border-radius: 0.5rem;
    padding: 0.5rem 0.875rem;
    color: var(--byz-color-text);
    font-family: var(--byz-font-sans);
    font-size: 0.875rem;
    min-width: 14rem;
    transition: border-color 0.15s;
    &:focus { outline: none; border-color: var(--byz-brand-500); }
    &::placeholder { color: var(--byz-color-text-muted); }
  }

  &__wrapper {
    overflow-x: auto;
    border: 1px solid var(--byz-color-border);
    border-radius: 0.75rem;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    &--striped tbody tr:nth-child(even) {
      background: rgba(255,255,255,0.02);
    }
  }

  &__head {
    background: var(--byz-color-surface);
    border-bottom: 1px solid var(--byz-color-border);

    &--sticky { position: sticky; top: 0; z-index: 1; }
  }

  &__th {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--byz-color-text-muted);
    white-space: nowrap;

    &--center { text-align: center; }
    &--right  { text-align: right; }
  }

  &__sort-btn {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0;
    &:hover { color: var(--byz-color-text); }
  }

  &__sort-icon { opacity: 0.5; }

  &__body { }

  &__row {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    cursor: pointer;
    transition: background 0.1s;
    &:last-child { border-bottom: none; }
    &:hover { background: rgba(192, 16, 48, 0.05); }
  }

  &__td {
    padding: 0.75rem 1rem;
    color: var(--byz-color-text);
    &--center { text-align: center; }
    &--right  { text-align: right; }
  }

  &__empty-cell {
    padding: 3rem;
    text-align: center;
    color: var(--byz-color-text-muted);
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__pagination-info {
    font-size: 0.75rem;
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-mono);
  }

  &__pagination-btns {
    display: flex;
    gap: 0.25rem;
  }

  &__page-btn {
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    border: 1px solid var(--byz-color-border);
    border-radius: 0.375rem;
    background: var(--byz-color-surface);
    color: var(--byz-color-text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;

    &:hover:not(:disabled) {
      border-color: var(--byz-brand-500);
      color: var(--byz-color-text);
    }
    &:disabled { opacity: 0.4; cursor: not-allowed; }

    &--active {
      background: var(--byz-brand-500);
      border-color: var(--byz-brand-500);
      color: #fff;
    }
  }
}
</style>
