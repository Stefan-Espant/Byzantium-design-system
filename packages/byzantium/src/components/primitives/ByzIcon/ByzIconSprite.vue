<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineOptions({ name: 'ByzIconSprite' })

const spriteHtml = ref('')

onMounted(async () => {
  const res = await fetch('/byz-icons-sprite.svg')
  if (res.ok) spriteHtml.value = await res.text()
})
</script>

<template>
  <div
    class="byz-icon-sprite-root"
    aria-hidden="true"
    v-html="spriteHtml"
  />
</template>

<style lang="scss" scoped>
.byz-icon-sprite-root {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
