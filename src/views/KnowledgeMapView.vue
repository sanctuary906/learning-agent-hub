<template>
  <div class="map-view view-frame">
    <PageTitle title="KNOWLEDGE MAP" subtitle="像选关一样学习人工智能导论。" eyebrow="Stage Select" />
    <div class="map-stats">
      <StatBlock label="LEVEL" value="Lv.6" hint="玩家等级" color="var(--green)" />
      <StatBlock label="XP" value="1280" hint="学习积分" color="var(--cyan)" />
      <StatBlock label="BADGE" value="5" hint="已解锁徽章" color="var(--yellow)" />
      <StatBlock label="STREAK" value="6 天" hint="连续学习" color="var(--magenta)" />
    </div>
    <section class="map-layout">
      <KnowledgeMap :nodes="nodes" @select="selected = $event" />
      <BrutalCard color="var(--yellow)" :tilt="0.7">
        <h3 class="panel-title">关卡详情</h3>
        <div class="detail">
          <StatusBadge :label="selected.status" :kind="selected.status === 'WEAK' ? 'weak' : selected.status === 'LOCKED' ? 'locked' : selected.status === 'MASTERED' ? 'done' : 'running'" />
          <h2>{{ selected.label }}</h2>
          <p>掌握度：{{ selected.mastery }}%</p>
          <p>推荐资源：{{ selected.resources.join('、') }}</p>
          <p>解锁条件：{{ selected.prerequisites.length ? selected.prerequisites.join('、') : '已解锁' }}</p>
          <BrutalButton color="var(--green)" go="GO">START</BrutalButton>
        </div>
      </BrutalCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BrutalButton from '@/components/common/BrutalButton.vue';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import StatBlock from '@/components/common/StatBlock.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import KnowledgeMap from '@/components/map/KnowledgeMap.vue';
import { knowledgeMapNodes } from '@/mock/knowledgeMap';

const nodes = knowledgeMapNodes;
const selected = ref(nodes[6]);
</script>

<style scoped>
.map-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.map-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 22px;
  height: calc(100% - 252px);
  min-height: 0;
}

.detail {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.detail h2 {
  margin: 0;
  font-size: 38px;
  font-weight: 1000;
}

.detail p {
  margin: 0;
  font-weight: 900;
  line-height: 1.55;
}

@media (max-width: 1180px) {
  .map-layout,
  .map-stats {
    grid-template-columns: 1fr;
  }
}
</style>
