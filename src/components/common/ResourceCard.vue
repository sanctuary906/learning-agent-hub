<template>
  <article class="resource-card glass-card">
    <div class="card-content">
      <div class="resource-top">
        <span class="type">{{ resource.type }}</span>
        <span class="status" :class="statusClass">{{ resource.status }}</span>
      </div>
      <h3>{{ resource.title }}</h3>
      <p class="summary">{{ resource.summary }}</p>
      <div class="meta-row">
        <span>{{ resource.difficulty }}</span>
        <span>{{ resource.duration }}</span>
        <span>{{ resource.agent }}</span>
      </div>
      <div class="tag-row">
        <span v-for="tag in resource.tags" :key="tag" class="soft-tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardResource } from '@/mock/dashboard';

const props = defineProps<{
  resource: DashboardResource;
}>();

const statusClass = computed(() => ({
  done: props.resource.status === '已生成',
  running: props.resource.status === '生成中',
  review: props.resource.status === '待审核',
}));
</script>

<style scoped>
.resource-card {
  min-height: 216px;
  padding: 18px;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.resource-card:hover {
  border-color: rgba(125, 211, 252, 0.46);
  box-shadow: 0 20px 70px rgba(37, 99, 235, 0.2);
  transform: translate(-2px, -2px);
}

.resource-top,
.meta-row,
.tag-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.resource-top {
  justify-content: space-between;
  margin-bottom: 14px;
}

.type {
  color: var(--cyan);
  font-size: 12px;
  font-weight: 750;
}

.status {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 999px;
}

.status.done {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.14);
}

.status.running {
  color: #bfdbfe;
  background: rgba(59, 130, 246, 0.16);
}

.status.review {
  color: #fde68a;
  background: rgba(245, 158, 11, 0.14);
}

h3 {
  margin: 0 0 9px;
  font-size: 18px;
}

.summary {
  min-height: 44px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.65;
}

.meta-row {
  padding-top: 12px;
  margin-bottom: 12px;
  color: #cbd5e1;
  font-size: 12px;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
}

.meta-row span:not(:last-child)::after {
  margin-left: 8px;
  color: var(--faint);
  content: "/";
}
</style>
