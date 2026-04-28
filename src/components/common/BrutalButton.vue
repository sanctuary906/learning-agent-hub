<template>
  <button class="brutal-button pressable" :style="{ background: color }" type="button">
    <slot />
    <span v-if="go" class="go">{{ go }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
    go?: string;
  }>(),
  {
    color: 'var(--green)',
    go: '',
  },
);
</script>

<style scoped>
.go {
  display: grid;
  min-width: 26px;
  height: 26px;
  padding: 0 5px;
  color: var(--white);
  place-items: center;
  background: var(--ink);
  border-radius: 999px;
}
</style>
