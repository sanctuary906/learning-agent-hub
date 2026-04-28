<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { growthSeries } from '@/mock/profile';

const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;
const resize = () => chart?.resize();

onMounted(() => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  chart.setOption({
    grid: { left: 36, right: 20, top: 36, bottom: 32, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
      axisLabel: { color: '#050505', fontWeight: 900 },
      axisLine: { lineStyle: { color: '#050505', width: 3 } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#050505', fontWeight: 900 },
      splitLine: { lineStyle: { color: '#050505', width: 1, type: 'dashed' } },
    },
    series: [
      {
        data: growthSeries,
        type: 'line',
        smooth: true,
        symbolSize: 14,
        lineStyle: { color: '#00E5FF', width: 6 },
        itemStyle: { color: '#FFE500', borderColor: '#050505', borderWidth: 4 },
        areaStyle: { color: 'rgba(0,229,255,0.26)' },
      },
    ],
  });
  requestAnimationFrame(resize);
  window.addEventListener('resize', resize);
});

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
