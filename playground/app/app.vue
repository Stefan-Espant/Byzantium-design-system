<script setup lang="ts">
import { useTheme, useLocale } from '@byzantium-design-system/core'

const { init: initTheme }  = useTheme()
const { init: initLocale } = useLocale()
onMounted(() => { initTheme(); initLocale() })
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
@keyframes byz-vt-out {
  to { opacity: 0; }
}
@keyframes byz-vt-in {
  from { opacity: 0; transform: translateY(6px); }
}

::view-transition-old(root) {
  animation: 120ms ease both byz-vt-out;
}
::view-transition-new(root) {
  animation: 200ms ease both byz-vt-in;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
</style>

