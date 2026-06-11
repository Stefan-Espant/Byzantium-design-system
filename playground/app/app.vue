<script setup lang="ts">
import { useTheme, useLocale } from '@byzantium-design-system/core'

const { init: initTheme }  = useTheme()
const { init: initLocale } = useLocale()
onMounted(() => { initTheme(); initLocale() })

if (import.meta.client) {
  const router = useRouter()
  router.beforeResolve((to, from) => {
    if (to.path === from.path || !('startViewTransition' in document)) return
    return new Promise<void>((resolve) => {
      (document as any).startViewTransition(resolve)
    })
  })
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>


