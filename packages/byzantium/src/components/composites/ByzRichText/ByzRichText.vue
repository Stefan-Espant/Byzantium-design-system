<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLocale } from '../../../composables/useLocale'

defineOptions({ name: 'ByzRichText' })

interface Props {
  modelValue?: string
  placeholder?: string
  minHeight?:   string
  readonly?:    boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:  '',
  minHeight:   '8rem',
  readonly:    false,
})

const emit = defineEmits<{
  'update:modelValue': [html: string]
  change: [html: string]
}>()

const { t } = useLocale()
const editorRef = ref<HTMLDivElement | null>(null)
const isFocused = ref(false)

onMounted(() => {
  if (editorRef.value) editorRef.value.innerHTML = props.modelValue
})

watch(() => props.modelValue, (val) => {
  if (editorRef.value && editorRef.value.innerHTML !== val) {
    editorRef.value.innerHTML = val
  }
})

function exec(command: string, value?: string) {
  document.execCommand(command, false, value)
  editorRef.value?.focus()
  onInput()
}

function onInput() {
  const html = editorRef.value?.innerHTML ?? ''
  emit('update:modelValue', html)
  emit('change', html)
}

function insertLink() {
  const url = prompt(t('link'))
  if (url) exec('createLink', url)
}

type ToolbarItem =
  | { type: 'button'; cmd: string; label: () => string; icon: string }
  | { type: 'separator' }

const toolbar: ToolbarItem[] = [
  { type: 'button', cmd: 'bold',          label: () => t('bold'),          icon: '<b>B</b>' },
  { type: 'button', cmd: 'italic',        label: () => t('italic'),        icon: '<i>I</i>' },
  { type: 'button', cmd: 'underline',     label: () => t('underline'),     icon: '<u>U</u>' },
  { type: 'button', cmd: 'strikeThrough', label: () => t('strikethrough'), icon: '<s>S</s>' },
  { type: 'separator' },
  { type: 'button', cmd: 'insertOrderedList',   label: () => t('orderedList'),   icon: 'OL' },
  { type: 'button', cmd: 'insertUnorderedList', label: () => t('unorderedList'), icon: 'UL' },
  { type: 'separator' },
  { type: 'button', cmd: 'undo', label: () => t('undo'), icon: '↩' },
  { type: 'button', cmd: 'redo', label: () => t('redo'), icon: '↪' },
]

function isActive(cmd: string): boolean {
  try { return document.queryCommandState(cmd) } catch { return false }
}
</script>

<template>
  <div class="byz-richtext" :class="{ 'byz-richtext--focused': isFocused, 'byz-richtext--readonly': readonly }">

    <div v-if="!readonly" class="byz-richtext__toolbar" role="toolbar" :aria-label="t('commandPalette')">
      <template v-for="(item, i) in toolbar" :key="i">
        <div v-if="item.type === 'separator'" class="byz-richtext__sep" />
        <button
          v-else
          class="byz-richtext__tool"
          :class="{ 'byz-richtext__tool--active': isActive(item.cmd) }"
          :aria-label="item.label()"
          :aria-pressed="isActive(item.cmd)"
          type="button"
          @mousedown.prevent="item.cmd === 'createLink' ? insertLink() : exec(item.cmd)"
          v-html="item.icon"
        />
      </template>
      <button
        class="byz-richtext__tool"
        :aria-label="t('link')"
        type="button"
        @mousedown.prevent="insertLink"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M6 8a3 3 0 0 0 4.243 0l1.414-1.414a3 3 0 0 0-4.243-4.243l-.707.707"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8 6a3 3 0 0 0-4.243 0L2.343 7.414a3 3 0 0 0 4.243 4.243l.707-.707"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button
        class="byz-richtext__tool"
        :aria-label="t('unlink')"
        type="button"
        @mousedown.prevent="exec('unlink')"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M6 8a3 3 0 0 0 4.243 0l1.414-1.414a3 3 0 0 0-4.243-4.243l-.707.707M8 6a3 3 0 0 0-4.243 0L2.343 7.414a3 3 0 0 0 4.243 4.243l.707-.707M2 2l10 10"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div
      ref="editorRef"
      class="byz-richtext__editor"
      :style="{ minHeight: minHeight }"
      :contenteditable="!readonly"
      :data-placeholder="placeholder"
      :aria-multiline="true"
      role="textbox"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

  </div>
</template>

<style lang="scss" scoped>
.byz-richtext {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: border-color 0.15s;

  &--focused { border-color: var(--byz-brand-500); }

  &__toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.125rem;
    padding: 0.5rem;
    background: var(--byz-color-surface);
    border-bottom: 1px solid var(--byz-color-border);
  }

  &__tool {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.375rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    background: none;
    color: var(--byz-color-text-muted);
    font-size: 0.8rem;
    font-family: var(--byz-font-sans);
    cursor: pointer;
    transition: all 0.15s;

    &:hover { background: var(--byz-color-surface-raised); color: var(--byz-color-text); }

    &--active {
      background: rgba(192, 16, 48, 0.15);
      border-color: rgba(192, 16, 48, 0.3);
      color: var(--byz-brand-500);
    }

    :deep(b)  { font-weight: 700; }
    :deep(i)  { font-style: italic; }
    :deep(u)  { text-decoration: underline; }
    :deep(s)  { text-decoration: line-through; }
  }

  &__sep {
    width: 1px;
    height: 1.25rem;
    background: var(--byz-color-border);
    margin: 0 0.25rem;
  }

  &__editor {
    padding: 0.875rem 1rem;
    color: var(--byz-color-text);
    font-family: var(--byz-font-sans);
    font-size: 0.9rem;
    line-height: 1.6;
    outline: none;
    background: var(--byz-color-surface-raised);

    &:empty::before {
      content: attr(data-placeholder);
      color: var(--byz-color-text-muted);
      pointer-events: none;
    }

    :deep(b), :deep(strong) { font-weight: 700; }
    :deep(i), :deep(em)     { font-style: italic; }
    :deep(u)                { text-decoration: underline; }
    :deep(s)                { text-decoration: line-through; }
    :deep(a)                { color: var(--byz-brand-400, #e84050); text-decoration: underline; }
    :deep(ol)               { padding-left: 1.5rem; list-style: decimal; }
    :deep(ul)               { padding-left: 1.5rem; list-style: disc; }
  }

  &--readonly &__editor {
    background: var(--byz-color-surface);
    cursor: default;
  }
}
</style>
