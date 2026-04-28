<template>
  <article class="agent-card" :class="agent.status">
    <div class="agent-orb">
      <span />
    </div>
    <div class="agent-main">
      <div class="agent-title">
        <h3>{{ agent.name }}</h3>
        <span>{{ statusText }}</span>
      </div>
      <p>{{ agent.outputSummary }}</p>
      <div class="agent-progress">
        <i :style="{ width: `${agent.progress}%` }" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { AgentInfo } from '@/mock/agents';

const props = defineProps<{
  agent: AgentInfo;
}>();

const statusText = computed(() => {
  const map = {
    waiting: '等待',
    running: '运行中',
    done: '完成',
    warning: '预警',
    error: '异常',
  };
  return map[props.agent.status];
});
</script>

<style scoped>
.agent-card {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  padding: 14px;
  background: rgba(15, 23, 42, 0.58);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
}

.agent-orb {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.24);
  border-radius: 14px;
}

.agent-orb span {
  width: 14px;
  height: 14px;
  background: var(--faint);
  border-radius: 50%;
}

.agent-card.running .agent-orb span {
  background: var(--cyan);
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.78);
  animation: orb-pulse 1.5s ease-in-out infinite;
}

.agent-card.done .agent-orb span {
  background: var(--green);
  box-shadow: 0 0 14px rgba(34, 197, 94, 0.62);
}

.agent-title {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

h3 {
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agent-title span {
  flex: 0 0 auto;
  color: #bfdbfe;
  font-size: 12px;
}

p {
  margin: 7px 0 10px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.agent-progress {
  height: 6px;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.92);
  border-radius: 999px;
}

.agent-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--cyan));
  border-radius: inherit;
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.42);
}

@keyframes orb-pulse {
  0%,
  100% {
    opacity: 0.72;
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.42);
  }

  50% {
    opacity: 1;
    box-shadow: 0 0 18px rgba(34, 211, 238, 0.78);
  }
}
</style>
