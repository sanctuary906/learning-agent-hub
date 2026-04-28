<template>
  <div class="section-header">
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </div>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  eyebrow?: string;
}>();
</script>

<style scoped>
.section-header {
  display: flex;
  gap: 16px;
  align-items: end;
  justify-content: space-between;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--cyan);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 750;
  letter-spacing: 0;
}
</style>
