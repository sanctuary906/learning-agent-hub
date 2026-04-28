<template>
  <div class="assessment-view view-frame">
    <PageTitle title="BATTLE REPORT" subtitle="只看本周最关键的学习战况。" eyebrow="Score Board" />

    <section class="assessment-layout">
      <BrutalCard class="score-card" color="var(--green)" :tilt="-0.8">
        <span class="sticker">TOTAL SCORE</span>
        <strong>{{ assessmentSummary.score }}/100</strong>
        <p>本周状态：持续升级中</p>
      </BrutalCard>

      <div class="metric-grid">
        <StatBlock label="学习时长" :value="assessmentSummary.hours" hint="本周累计" color="var(--cyan)" />
        <StatBlock label="练习正确率" :value="`${assessmentSummary.accuracy}%`" hint="比上周 +6%" color="var(--yellow)" />
        <StatBlock label="资源完成率" :value="`${assessmentSummary.resourceCompletion}%`" hint="还有 4 个补给" color="var(--magenta)" />
        <StatBlock label="薄弱点数量" :value="`${assessmentSummary.weakCount}`" hint="待悬赏攻克" color="var(--orange)" />
      </div>

      <BrutalCard class="analysis-panel" color="var(--white)" :tilt="0.35">
        <div class="panel-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="{ active: activeTab === tab.key }"
            type="button"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <div :key="activeTab" class="analysis-content allow-internal-scroll">
            <div v-if="activeTab === 'trend'" ref="lineRef" class="chart"></div>
            <div v-else-if="activeTab === 'heat'" class="heatmap">
              <span v-for="(cell, index) in heatCells" :key="index" :style="{ background: cell }"></span>
            </div>
            <ol v-else class="wrong-list">
              <li v-for="item in wrongTop" :key="item">{{ item }}</li>
            </ol>
          </div>
        </Transition>
      </BrutalCard>

      <BrutalCard class="advice-panel" color="var(--cyan)" :tilt="-0.35">
        <h3 class="panel-title">AI 调整建议</h3>
        <p class="advice">建议先完成图解资源，再进入代码实战。</p>
        <p class="advice">下一关推荐：随机森林。</p>
        <p class="advice">{{ assessmentSummary.suggestion }}</p>
      </BrutalCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import StatBlock from '@/components/common/StatBlock.vue';
import { assessmentSummary, weeklyLine, wrongTop } from '@/mock/assessment';

type AssessmentTab = 'trend' | 'heat' | 'wrong';

const activeTab = ref<AssessmentTab>('trend');
const lineRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

const tabs: Array<{ key: AssessmentTab; label: string }> = [
  { key: 'trend', label: '学习曲线' },
  { key: 'heat', label: '掌握热力' },
  { key: 'wrong', label: '错题 TOP' },
];

const heatCells = [
  '#C6FF00',
  '#C6FF00',
  '#00E5FF',
  '#FFE500',
  '#FF9800',
  '#FF00C8',
  '#C6FF00',
  '#FFE500',
  '#00E5FF',
  '#FF9800',
  '#DEDED6',
  '#C6FF00',
  '#FF00C8',
  '#FFE500',
  '#00E5FF',
  '#C6FF00',
];

const resize = () => chart?.resize();

const renderChart = async () => {
  await nextTick();
  if (activeTab.value !== 'trend' || !lineRef.value) return;
  chart?.dispose();
  chart = echarts.init(lineRef.value);
  chart.setOption({
    grid: { left: 34, right: 18, top: 26, bottom: 32 },
    xAxis: {
      type: 'category',
      data: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      axisLabel: { color: '#050505', fontWeight: 900 },
      axisLine: { lineStyle: { color: '#050505', width: 3 } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#050505', fontWeight: 900 },
      splitLine: { lineStyle: { color: '#050505', type: 'dashed' } },
    },
    series: [
      {
        type: 'bar',
        data: weeklyLine,
        itemStyle: { color: '#00E5FF', borderColor: '#050505', borderWidth: 3 },
      },
      {
        type: 'line',
        data: weeklyLine,
        smooth: true,
        symbolSize: 12,
        lineStyle: { color: '#FF00C8', width: 5 },
        itemStyle: { color: '#FFE500', borderColor: '#050505', borderWidth: 3 },
      },
    ],
  });
};

watch(activeTab, renderChart);

onMounted(() => {
  renderChart();
  window.addEventListener('resize', resize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  chart?.dispose();
});
</script>

<style scoped>
.assessment-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(0, 1.35fr) minmax(300px, 0.87fr);
  grid-template-rows: auto minmax(0, 1fr);
  gap: 20px;
  height: calc(100% - 112px);
  min-height: 0;
}

.score-card {
  display: grid;
  min-height: 220px;
  align-content: center;
}

.score-card strong {
  display: block;
  margin: 12px 0 6px;
  font-size: clamp(54px, 7vw, 96px);
  font-weight: 1000;
  line-height: 0.9;
}

.score-card p,
.advice {
  margin: 0;
  font-weight: 1000;
}

.metric-grid {
  display: grid;
  grid-column: 1;
  grid-row: 2;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  min-height: 0;
}

.analysis-panel {
  display: grid;
  grid-row: 1 / span 2;
  grid-column: 2;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
}

.advice-panel {
  display: grid;
  grid-row: 1 / span 2;
  grid-column: 3;
  align-content: center;
  gap: 14px;
}

.panel-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.panel-tabs button {
  min-height: 46px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
}

.panel-tabs button.active {
  background: var(--green);
  box-shadow: 2px 2px 0 var(--ink);
  transform: translate(2px, 2px);
}

.analysis-content {
  min-height: 0;
  overflow: auto;
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 360px;
}

.heatmap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  align-content: center;
  min-height: 100%;
}

.heatmap span {
  display: block;
  aspect-ratio: 1;
  border: 3px solid var(--ink);
  border-radius: 7px;
  box-shadow: 4px 4px 0 var(--ink);
}

.wrong-list {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style-position: inside;
}

.wrong-list li,
.advice {
  padding: 12px;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
}

.wrong-list li {
  font-weight: 1000;
}

@media (max-width: 1180px) {
  .assessment-view {
    overflow: auto;
  }

  .assessment-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }

  .metric-grid,
  .analysis-panel,
  .advice-panel {
    grid-row: auto;
    grid-column: auto;
  }
}
</style>
