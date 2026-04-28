<template>
  <div class="map-board allow-internal-scroll">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        :points="nodes.map((node) => `${node.x},${node.y}`).join(' ')"
        fill="none"
        stroke="#050505"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <button
      v-for="node in nodes"
      :key="node.id"
      class="map-node"
      :class="node.status.toLowerCase()"
      :style="{ left: `${node.x}%`, top: `${node.y}%` }"
      type="button"
      @click="$emit('select', node)"
    >
      <span>{{ node.status === 'LOCKED' ? 'LOCK' : node.status === 'MASTERED' ? 'OK' : node.status }}</span>
      <strong>{{ node.label }}</strong>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { knowledgeMapNodes } from '@/mock/knowledgeMap';

defineProps<{ nodes: typeof knowledgeMapNodes }>();
defineEmits<{ select: [node: (typeof knowledgeMapNodes)[number]] }>();
</script>

<style scoped>
.map-board {
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: auto;
  background:
    radial-gradient(circle, rgba(5, 5, 5, 0.08) 2px, transparent 2px),
    var(--white);
  background-size: 24px 24px;
  border: 4px solid var(--ink);
  border-radius: 12px;
  box-shadow: var(--shadow);
}

svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.map-node {
  position: absolute;
  display: grid;
  gap: 4px;
  width: 128px;
  min-height: 82px;
  padding: 8px;
  color: var(--ink);
  cursor: pointer;
  background: var(--cyan);
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: 5px 5px 0 var(--ink);
  transform: translate(-50%, -50%);
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.map-node:hover {
  z-index: 2;
  box-shadow: 8px 8px 0 var(--ink);
  transform: translate(calc(-50% - 2px), calc(-50% - 2px)) rotate(-2deg);
}

.map-node span {
  justify-self: start;
  padding: 2px 6px;
  color: var(--white);
  font-size: 10px;
  font-weight: 1000;
  background: var(--ink);
  border-radius: 4px;
}

.map-node strong {
  font-size: 15px;
  font-weight: 1000;
}

.mastered {
  background: var(--green);
}

.weak {
  background: var(--orange);
}

.learning {
  background: var(--magenta);
  color: var(--white);
}

.review {
  background: var(--yellow);
}

.locked {
  background: var(--gray);
  color: rgba(5, 5, 5, 0.62);
}
</style>
