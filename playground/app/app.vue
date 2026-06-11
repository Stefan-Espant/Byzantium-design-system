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


