<script setup lang="ts">
  defineOptions({ name: 'ByzFooter' })

  interface FooterLink {
    label: string
    href: string
  }

  interface Props {
    brand: string
    links?: FooterLink[]
    copyright?: string
  }

  withDefaults(defineProps<Props>(), {
    links: () => []
  })
</script>

<template>
  <footer class="byz-footer">
    <div class="byz-footer__inner">
      <span class="byz-footer__brand">{{ brand }}</span>

      <nav v-if="links && links.length" class="byz-footer__nav" aria-label="Footer links">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="byz-footer__link"
        >{{ link.label }}</a>
      </nav>

      <div v-if="$slots.default" class="byz-footer__extra">
        <slot />
      </div>

      <span v-if="copyright" class="byz-footer__copyright">{{ copyright }}</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.byz-footer {
  border-top: 1px solid var(--byz-color-border);

  &__inner {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--byz-space-4);
    max-width: 72rem;
    margin: 0 auto;
    padding: var(--byz-space-6) var(--byz-space-6);
  }

  &__brand {
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-base);
    font-weight: var(--byz-font-bold);
    color: var(--byz-color-text-muted);
    margin-right: auto;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--byz-space-6);
    flex-wrap: wrap;
  }

  &__link {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-medium);
    color: var(--byz-color-text-muted);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-text-primary);
    }
  }

  &__extra {
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
  }

  &__copyright {
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    &__inner {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--byz-space-4);
    }

    &__brand {
      margin-right: 0;
    }

    &__copyright {
      order: 10;
    }
  }
}
</style>
