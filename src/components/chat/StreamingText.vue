<template>
  <div class="streaming" v-html="html"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{ text: string }>();
const md = new MarkdownIt({ breaks: true });
const html = computed(() => md.render(props.text));
</script>

<style scoped>
.streaming :deep(p) {
  margin: 0 0 8px;
}

.streaming :deep(strong) {
  background: var(--yellow);
  padding: 0 4px;
}
</style>
