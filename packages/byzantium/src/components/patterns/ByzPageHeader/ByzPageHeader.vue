<script setup lang="ts">
  defineOptions({ name: 'ByzPageHeader' })

  interface Breadcrumb {
    label: string
    href?: string
  }

  interface Props {
    title: string
    subtitle?: string
    breadcrumbs?: Breadcrumb[]
  }

  withDefaults(defineProps<Props>(), {
    breadcrumbs: () => []
  })
</script>

<template>
  <div class="byz-page-header">
    <nav v-if="breadcrumbs && breadcrumbs.length" class="byz-page-header__breadcrumbs" aria-label="Breadcrumb">
      <span
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="byz-page-header__crumb"
      >
        <a v-if="crumb.href" :href="crumb.href" class="byz-page-header__crumb-link">{{ crumb.label }}</a>
        <span v-else class="byz-page-header__crumb-text">{{ crumb.label }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="byz-page-header__crumb-sep" aria-hidden="true">/</span>
      </span>
    </nav>

    <div class="byz-page-header__row">
      <div class="byz-page-header__titles">
        <h1 class="byz-page-header__title">{{ title }}</h1>
        <p v-if="subtitle" class="byz-page-header__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="byz-page-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.byz-page-header {
  border-bottom: 1px solid var(--byz-color-border);
  padding-bottom: var(--byz-space-6);
  margin-bottom: var(--byz-space-8);

  &__breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--byz-space-1);
    margin-bottom: var(--byz-space-3);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-sm);
    color: var(--byz-color-text-muted);
  }

  &__crumb {
    display: inline-flex;
    align-items: center;
    gap: var(--byz-space-1);
  }

  &__crumb-link {
    color: var(--byz-color-text-muted);
    text-decoration: none;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-text-primary);
    }
  }

  &__crumb-text {
    color: var(--byz-color-text-secondary);
  }

  &__crumb-sep {
    color: var(--byz-color-text-muted);
    margin: 0 var(--byz-space-1);
    opacity: 0.5;
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--byz-space-6);
  }

  &__titles {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-4xl);
    font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-primary);
    line-height: 1.1;
    margin: 0;
  }

  &__subtitle {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-base);
    color: var(--byz-color-text-muted);
    margin: var(--byz-space-2) 0 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
    flex-shrink: 0;
    padding-top: var(--byz-space-1);
  }
}
</style>
