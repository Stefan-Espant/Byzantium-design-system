<script setup lang="ts">
  import { useLocale } from '../../../composables/useLocale'

  defineOptions({ name: 'ByzBreadcrumb' })

  const { t } = useLocale()

  interface BreadcrumbItem {
    label: string
    href?: string
  }

  interface Props {
    items: BreadcrumbItem[]
    separator?: string
  }

  withDefaults(defineProps<Props>(), {
    separator: '/',
  })
</script>

<template>
  <nav :aria-label="t('breadcrumbNav')" class="byz-breadcrumb">
    <ol class="byz-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="byz-breadcrumb__item"
      >
        <span
          v-if="index > 0"
          class="byz-breadcrumb__separator"
          aria-hidden="true"
        >{{ separator }}</span>

        <a
          v-if="item.href"
          :href="item.href"
          class="byz-breadcrumb__link"
        >{{ item.label }}</a>

        <span
          v-else
          class="byz-breadcrumb__current"
          aria-current="page"
        >{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.byz-breadcrumb {
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0;
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: var(--byz-text-sm);
  }

  &__separator {
    color: var(--byz-color-text-muted);
    margin: 0 var(--byz-space-2);
    user-select: none;
  }

  &__link {
    color: var(--byz-color-text-muted);
    text-decoration: none;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-accent);
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  &__current {
    color: var(--byz-color-text-primary);
    font-weight: var(--byz-font-medium);
  }
}
</style>
