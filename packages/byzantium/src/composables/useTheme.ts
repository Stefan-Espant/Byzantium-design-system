import { ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')

export function useTheme() {
  function setTheme(value: Theme) {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('byz-theme', value)
  }

  function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  function init() {
    const stored = localStorage.getItem('byz-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    setTheme(stored ?? preferred)
  }

  return { theme, setTheme, toggle, init }
}
