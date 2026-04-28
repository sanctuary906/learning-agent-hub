<template>
  <div class="arena-board allow-internal-scroll">
    <div
      v-for="agent in agents"
      :key="agent.id"
      class="arena-node"
      :class="[agent.status, { 'agent-running': agent.status === 'running' }]"
      :style="{ background: agent.color }"
    >
      <StatusBadge :label="agent.status.toUpperCase()" :kind="badgeKind(agent.status)" />
      <strong>{{ agent.name }}</strong>
      <small>{{ agent.role }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from '@/components/common/StatusBadge.vue';
import type { AgentInfo } from '@/mock/agents';

defineProps<{ agents: AgentInfo[] }>();

const badgeKind = (status: AgentInfo['status']) => {
  if (status === 'done') return 'done';
  if (status === 'running') return 'running';
  if (status === 'waiting') return 'waiting';
  if (status === 'warning') return 'review';
  return 'weak';
};
</script>

<style scoped>
.arena-board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 18px;
  height: 100%;
  min-height: 0;
  padding: 22px;
  overflow: auto;
  background: var(--white);
  border: 4px solid var(--ink);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.arena-board::before {
  position: absolute;
  inset: 38px;
  z-index: 0;
  content: "";
  background:
    linear-gradient(90deg, transparent 0 22%, var(--ink) 22% calc(22% + 4px), transparent calc(22% + 4px) 46%, var(--ink) 46% calc(46% + 4px), transparent calc(46% + 4px) 70%, var(--ink) 70% calc(70% + 4px), transparent calc(70% + 4px)),
    linear-gradient(transparent 0 32%, var(--ink) 32% calc(32% + 4px), transparent calc(32% + 4px) 62%, var(--ink) 62% calc(62% + 4px), transparent calc(62% + 4px));
  opacity: 0.14;
}

.arena-node {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 8px;
  min-height: 126px;
  padding: 14px;
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: 6px 6px 0 var(--ink);
}

.arena-node.running {
  outline: 4px solid var(--ink);
  outline-offset: 3px;
}

.arena-node.done {
  filter: saturate(1.2);
}

.arena-node.waiting {
  background: var(--gray) !important;
}

strong {
  font-size: 17px;
  font-weight: 1000;
}

small {
  font-weight: 1000;
}

@media (max-width: 1100px) {
  .arena-board {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}
</style>
