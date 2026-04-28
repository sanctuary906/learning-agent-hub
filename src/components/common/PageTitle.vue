<template>
  <header class="page-title pop-in">
    <span v-if="eyebrow" class="sticker">{{ eyebrow }}</span>
    <h1 class="comic-title">{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
}>();
</script>

<style scoped>
.page-title {
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
}

p {
  max-width: 760px;
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--muted);
}
</style>
