<template>
  <span class="status-badge" :class="kind">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  kind?: 'ready' | 'running' | 'waiting' | 'weak' | 'review' | 'done' | 'locked';
}>();
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px 3px;
  color: var(--white);
  font-size: 11px;
  font-weight: 1000;
  text-transform: uppercase;
  background: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 5px;
}

.ready,
.done {
  color: var(--ink);
  background: var(--green);
}

.running {
  color: var(--ink);
  background: var(--cyan);
  animation: status-pulse 1.2s ease-in-out infinite;
}

.waiting,
.locked {
  color: var(--ink);
  background: var(--gray);
}

.weak,
.review {
  color: var(--ink);
  background: var(--orange);
}
</style>
