<template>
  <article class="stat-block" :style="{ background: color }">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
    <small>{{ hint }}</small>
  </article>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    value: string;
    hint?: string;
    color?: string;
  }>(),
  {
    hint: '',
    color: 'var(--yellow)',
  },
);
</script>

<style scoped>
.stat-block {
  min-height: 126px;
  padding: 16px;
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--shadow-small);
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.stat-block:hover {
  box-shadow: 7px 7px 0 var(--ink);
  transform: translate(-2px, -2px) rotate(-1deg);
}

span,
small {
  display: block;
  font-weight: 1000;
}

span {
  font-size: 13px;
  text-transform: uppercase;
}

strong {
  display: block;
  margin: 9px 0 5px;
  font-size: 36px;
  line-height: 1;
}

small {
  color: rgba(5, 5, 5, 0.72);
}
</style>
