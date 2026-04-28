<template>
  <article class="stat-card glass-card">
    <div class="card-content">
      <div class="stat-head">
        <span class="icon-wrap" :style="{ '--accent': color }">
          <component :is="icon" />
        </span>
        <span class="pulse-dot" />
      </div>
      <p>{{ label }}</p>
      <strong>{{ value }}</strong>
      <span class="trend">{{ trend }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  label: string;
  value: string;
  trend: string;
  icon: Component;
  color: string;
}>();
</script>

<style scoped>
.stat-card {
  min-height: 150px;
  padding: 18px;
}

.stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.icon-wrap {
  display: grid;
  width: 42px;
  height: 42px;
  color: #fff;
  place-items: center;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent) 72%, #ffffff 8%), rgba(15, 23, 42, 0.2)),
    rgba(15, 23, 42, 0.72);
  border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
  border-radius: 14px;
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 34%, transparent);
}

.icon-wrap :deep(svg) {
  width: 21px;
  height: 21px;
}

.pulse-dot {
  width: 9px;
  height: 9px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.1), 0 0 16px rgba(34, 197, 94, 0.72);
}

p {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--muted);
}

strong {
  display: block;
  margin-bottom: 8px;
  font-size: 30px;
  line-height: 1;
}

.trend {
  font-size: 12px;
  color: #bfdbfe;
}
</style>
