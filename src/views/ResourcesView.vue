<template>
  <div class="resources-view view-frame">
    <PageTitle title="RESOURCE SUPPLY" subtitle="多模态资源统一沉淀，随时加入通关路线。" eyebrow="Supply Station" />
    <BrutalCard color="var(--cyan)" :tilt="-0.4">
      <div class="filters">
        <input v-model="keyword" class="arcade-input" placeholder="搜索资源补给..." />
        <select v-model="type" class="select">
          <option value="">ALL TYPE</option>
          <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
        </select>
        <select v-model="difficulty" class="select">
          <option value="">ALL LEVEL</option>
          <option>EASY</option>
          <option>NORMAL</option>
          <option>HARD</option>
          <option>PRACTICE</option>
        </select>
        <BrutalButton color="var(--green)" go="+">生成新资源</BrutalButton>
      </div>
    </BrutalCard>
    <section class="resource-list allow-internal-scroll">
      <article v-for="resource in filtered" :key="resource.id" class="supply-card" :style="{ background: resource.color }">
        <div class="supply-top">
          <span class="soft-tag">{{ resource.type }}</span>
          <StatusBadge :label="resource.status" :kind="resource.status === 'READY' ? 'done' : resource.status === 'GENERATING' ? 'running' : 'review'" />
        </div>
        <h2>{{ resource.title }}</h2>
        <p>{{ resource.difficulty }} / {{ resource.duration }}</p>
        <p>知识点：{{ resource.relatedKnowledge.join('、') }}</p>
        <p>生成：{{ resource.agent }}</p>
        <div class="actions">
          <button>VIEW</button>
          <button>ADD</button>
          <button>REGEN</button>
          <button>EXPORT</button>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BrutalButton from '@/components/common/BrutalButton.vue';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import { resources } from '@/mock/resources';

const keyword = ref('');
const type = ref('');
const difficulty = ref('');
const types = ['DOC', 'PPT', 'QUIZ', 'MINDMAP', 'VIDEO', 'CODE', 'READING'];
const filtered = computed(() =>
  resources.filter((item) => {
    const matchKeyword = item.title.includes(keyword.value) || item.relatedKnowledge.join('').includes(keyword.value);
    const matchType = !type.value || item.type === type.value;
    const matchDifficulty = !difficulty.value || item.difficulty === difficulty.value;
    return matchKeyword && matchType && matchDifficulty;
  }),
);
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 160px 160px auto;
  gap: 14px;
}

.select {
  min-height: 46px;
  padding: 0 10px;
  font-weight: 1000;
  background: var(--white);
  border: 4px solid var(--ink);
  border-radius: 8px;
  box-shadow: 5px 5px 0 var(--ink);
}

.resource-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  height: calc(100% - 208px);
  min-height: 0;
  padding: 4px 8px 18px 4px;
  margin-top: 24px;
  overflow: auto;
}

.supply-card {
  display: grid;
  gap: 10px;
  min-height: 250px;
  padding: 18px;
  border: 4px solid var(--ink);
  border-radius: 11px;
  box-shadow: var(--shadow);
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.supply-card:hover {
  box-shadow: 10px 10px 0 var(--ink);
  transform: translate(-2px, -2px) rotate(-1deg);
}

.supply-top,
.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.supply-card h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 1000;
}

.supply-card p {
  margin: 0;
  font-weight: 900;
}

.actions button {
  padding: 7px 9px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 7px;
  box-shadow: 3px 3px 0 var(--ink);
}

@media (max-width: 1180px) {
  .resource-list,
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
