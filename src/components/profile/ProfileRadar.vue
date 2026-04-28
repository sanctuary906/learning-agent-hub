<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { profileDimensions } from '@/mock/profile';

const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

onMounted(() => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  chart.setOption({
    radar: {
      center: ['50%', '52%'],
      radius: '58%',
      indicator: profileDimensions.map((item) => ({
        name: item.dimension === '学习稳定性' ? '学习稳定' : item.dimension,
        max: 100,
      })),
      axisName: { color: '#050505', fontWeight: 900, fontSize: 11 },
      splitLine: { lineStyle: { color: '#050505', width: 2 } },
      splitArea: { areaStyle: { color: ['#FFFFFF', '#F4F4EF'] } },
      axisLine: { lineStyle: { color: '#050505', width: 2 } },
    },
    series: [
      {
        type: 'radar',
        data: [{ value: profileDimensions.map((item) => item.score), name: '能力值' }],
        lineStyle: { color: '#FF00C8', width: 5 },
        areaStyle: { color: 'rgba(198,255,0,0.55)' },
        itemStyle: { color: '#FF00C8', borderColor: '#050505', borderWidth: 3 },
      },
    ],
  });
  requestAnimationFrame(resize);
  window.addEventListener('resize', resize);
});

const resize = () => chart?.resize();

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  chart?.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 260px;
  min-height: 260px;
}
</style>
