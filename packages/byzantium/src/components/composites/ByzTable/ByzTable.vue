<script setup lang="ts">
import ByzSkeleton from '../../primitives/ByzSkeleton'

defineOptions({ name: 'ByzTable' })

interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

interface Props {
  columns: Column[]
  rows: Array<Record<string, unknown>>
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  loading?: boolean
  emptyMessage?: string
  striped?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyMessage: 'Geen gegevens beschikbaar',
  striped: false
})

const emit = defineEmits<{
  sort: [{ key: string; dir: 'asc' | 'desc' }]
}>()

function handleSort(col: Column) {
  if (!col.sortable) return
  const newDir: 'asc' | 'desc' =
    props.sortKey === col.key && props.sortDir === 'asc' ? 'desc' : 'asc'
  emit('sort', { key: col.key, dir: newDir })
}

function getSortIndicator(col: Column): string {
  if (!col.sortable) return ''
  if (props.sortKey !== col.key) return '↑↓'
  return props.sortDir === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <div class="byz-table-wrapper">
    <table class="byz-table" :class="{ 'byz-table--striped': striped }">
      <thead class="byz-table__head">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="byz-table__th"
            :class="{ 'byz-table__th--sortable': col.sortable }"
            :style="col.width ? { width: col.width } : {}"
            @click="handleSort(col)"
          >
            <span class="byz-table__th-inner">
              {{ col.label }}
              <span v-if="col.sortable" class="byz-table__sort-icon" aria-hidden="true">
                {{ getSortIndicator(col) }}
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="byz-table__body">
        <!-- Loading state -->
        <template v-if="loading">
          <tr v-for="n in 3" :key="`skeleton-${n}`" class="byz-table__row">
            <td v-for="col in columns" :key="col.key" class="byz-table__td">
              <ByzSkeleton height="16px" />
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <template v-else-if="rows.length === 0">
          <tr class="byz-table__row">
            <td :colspan="columns.length" class="byz-table__td byz-table__td--empty">
              {{ emptyMessage }}
            </td>
          </tr>
        </template>

        <!-- Data rows -->
        <template v-else>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="byz-table__row"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="byz-table__td"
            >
              {{ row[col.key] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.byz-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.byz-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--byz-font-sans);
  font-size: var(--byz-text-sm);
  color: var(--byz-color-text-primary);

  &__th {
    padding: var(--byz-space-3) var(--byz-space-4);
    border-bottom: 2px solid var(--byz-color-border);
    text-align: left;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--byz-color-text-muted);
    white-space: nowrap;

    &--sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--byz-color-text-secondary);
      }
    }
  }

  &__th-inner {
    display: inline-flex;
    align-items: center;
    gap: var(--byz-space-1);
  }

  &__sort-icon {
    font-size: var(--byz-text-xs);
    opacity: 0.7;
  }

  &__row {
    transition: background var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      background: rgba(255, 255, 255, 0.03);
    }
  }

  &__td {
    padding: var(--byz-space-3) var(--byz-space-4);
    border-bottom: 1px solid var(--byz-color-border);
    color: var(--byz-color-text-secondary);

    &--empty {
      text-align: center;
      color: var(--byz-color-text-muted);
      padding: var(--byz-space-8) var(--byz-space-4);
    }
  }

  // Striped rows
  &--striped &__row:nth-child(odd) {
    background: rgba(255, 255, 255, 0.02);
  }

  &--striped &__row:nth-child(odd):hover {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style>
