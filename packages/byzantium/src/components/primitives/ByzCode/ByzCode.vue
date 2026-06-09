<script setup lang="ts">
  import { useClipboard } from '../../../composables/useClipboard'

  defineOptions({ name: 'ByzCode' })

  interface Props {
    code: string
    language?: string
    copyable?: boolean
  }

  withDefaults(defineProps<Props>(), {
    copyable: true,
  })

  const { copied, copy } = useClipboard()
</script>

<template>
  <div class="byz-code">
    <div class="byz-code__toolbar">
      <span v-if="language" class="byz-code__lang">{{ language }}</span>
      <button
        v-if="copyable"
        class="byz-code__copy"
        :aria-label="copied ? 'Gekopieerd' : 'Kopieer code'"
        @click="copy(code)"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {{ copied ? 'Gekopieerd' : 'Kopieer' }}
      </button>
    </div>
    <pre class="byz-code__pre"><code class="byz-code__content">{{ code }}</code></pre>
  </div>
</template>

<style lang="scss" scoped>
.byz-code {
  position: relative;
  border-radius: 0.5rem;
  background: #0a0108;
  border: 1px solid var(--byz-color-border);
  overflow: hidden;

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--byz-space-2) var(--byz-space-4);
    border-bottom: 1px solid rgba(192, 16, 48, 0.12);
    background: rgba(255, 255, 255, 0.03);
    min-height: 2.5rem;
  }

  &__lang {
    font-family: var(--byz-font-mono);
    font-size: var(--byz-text-xs);
    color: var(--byz-color-text-muted);
    text-transform: lowercase;
    letter-spacing: 0.04em;
  }

  &__copy {
    display: inline-flex;
    align-items: center;
    gap: var(--byz-space-1);
    padding: var(--byz-space-1) var(--byz-space-2);
    border: 1px solid rgba(192, 16, 48, 0.2);
    border-radius: 0.25rem;
    background: transparent;
    color: var(--byz-color-text-muted);
    font-family: var(--byz-font-sans);
    font-size: var(--byz-text-xs);
    cursor: pointer;
    transition:
      color var(--byz-duration-fast) var(--byz-ease-default),
      border-color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      color: var(--byz-color-text-primary);
      border-color: var(--byz-color-focus);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-focus);
      outline-offset: 2px;
    }
  }

  &__pre {
    margin: 0;
    padding: var(--byz-space-4);
    overflow-x: auto;
  }

  &__content {
    font-family: var(--byz-font-mono);
    font-size: var(--byz-text-sm);
    line-height: var(--byz-leading-relaxed);
    color: rgba(255, 220, 220, 0.88);
    white-space: pre;
  }
}

[data-theme="light"] .byz-code {
  background: #1a0508;

  &__content {
    color: rgba(255, 210, 210, 0.9);
  }
}
</style>
