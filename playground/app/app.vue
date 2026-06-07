<script setup lang="ts">
import { useTheme } from '@byzantium/core'

const { init } = useTheme()
onMounted(() => init())
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
