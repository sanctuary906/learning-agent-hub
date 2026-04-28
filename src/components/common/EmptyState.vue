<template>
  <div class="empty-state glass-card">
    <div class="card-content">
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped>
.empty-state {
  padding: 48px 24px;
  text-align: center;
}

strong {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
}

p {
  max-width: 520px;
  margin: 0 auto;
  color: var(--muted);
  line-height: 1.7;
}
</style>
