<script setup lang="ts">
import { useTheme, useLocale } from '@byzantium/core'

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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Syne:wght@400;500;600;700;800&family=Source+Code+Pro:ital,wght@0,400;0,500;1,400&display=swap');
</style>
