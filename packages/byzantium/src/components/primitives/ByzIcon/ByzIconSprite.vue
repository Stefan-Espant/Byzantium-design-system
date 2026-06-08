<script setup lang="ts">
  import spriteMarkup from './byz-icons-sprite.svg?raw'

  defineOptions({ name: 'ByzIconSprite' })
</script>

<template>
  <div
    class="byz-icon-sprite-root"
    aria-hidden="true"
    v-html="spriteMarkup"
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
