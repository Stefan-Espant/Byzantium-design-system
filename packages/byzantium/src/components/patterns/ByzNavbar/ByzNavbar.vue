<script setup lang="ts">
  defineOptions({ name: 'ByzNavbar' })

  interface NavItem {
    label: string
    href: string
  }

  interface Props {
    brand: string
    items?: NavItem[]
  }

  withDefaults(defineProps<Props>(), {
    items: () => []
  })
</script>

<template>
  <header class="byz-navbar">
    <nav class="byz-navbar__inner" aria-label="Hoofdnavigatie">
      <a href="/" class="byz-navbar__brand">{{ brand }}</a>
      <ul class="byz-navbar__items" role="list">
        <li v-for="item in items" :key="item.href">
          <a :href="item.href" class="byz-navbar__link">{{ item.label }}</a>
        </li>
      </ul>
      <div v-if="$slots.default" class="byz-navbar__actions"><slot /></div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.byz-navbar {
  background-color: var(--byz-color-surface);
  border-bottom: 1px solid var(--byz-color-border);

  &__inner {
    display: flex;
    align-items: center;
    gap: var(--byz-space-8);
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--byz-space-6);
    min-height: 64px;
  }

  &__brand {
    font-weight: var(--byz-font-bold);
    font-size: var(--byz-text-lg);
    color: var(--byz-color-text-primary);
    text-decoration: none;
  }

  &__items {
    display: flex;
    gap: var(--byz-space-4);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: var(--byz-color-text-secondary);
    text-decoration: none;
    font-size: var(--byz-text-sm);
    font-weight: var(--byz-font-medium);
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0 var(--byz-space-2);

    &:hover { color: var(--byz-color-text-primary); }
  }

  &__actions { margin-left: auto; display: flex; align-items: center; gap: var(--byz-space-4); }
}
</style>
