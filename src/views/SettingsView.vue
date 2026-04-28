<template>
  <div class="settings-view view-frame">
    <PageTitle title="SETTINGS" subtitle="调节你的 AI 学习游戏机。" eyebrow="Console Setup" />
    <section class="settings-grid">
      <BrutalCard color="var(--yellow)" :tilt="-0.5">
        <h3 class="panel-title">主题模式</h3>
        <div class="segmented">
          <button class="active" type="button">Neo-pop</button>
          <button type="button">简洁模式</button>
        </div>
      </BrutalCard>
      <BrutalCard color="var(--cyan)" :tilt="0.5">
        <h3 class="panel-title">开关</h3>
        <label v-for="item in toggles" :key="item.label" class="switch-row">
          <span>{{ item.label }}</span>
          <input v-model="item.value" type="checkbox" />
        </label>
      </BrutalCard>
      <BrutalCard color="var(--green)" :tilt="-0.8">
        <h3 class="panel-title">默认资源偏好</h3>
        <div class="pref-grid">
          <button v-for="item in prefs" :key="item" :class="{ selected: selectedPrefs.includes(item) }" type="button" @click="togglePref(item)">
            {{ item }}
          </button>
        </div>
      </BrutalCard>
      <BrutalCard color="var(--magenta)" :tilt="0.7">
        <h3 class="panel-title">难度偏好</h3>
        <input v-model="difficulty" class="range" type="range" min="1" max="5" />
        <p class="range-value">LEVEL {{ difficulty }}</p>
      </BrutalCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';

const toggles = reactive([
  { label: '流式输出', value: true },
  { label: 'Agent 可视化', value: true },
  { label: '学习提醒', value: true },
]);
const prefs = ['图解', '文档', '视频', '代码', '题库'];
const selectedPrefs = ref(['图解', '代码', '题库']);
const difficulty = ref(3);

const togglePref = (item: string) => {
  if (selectedPrefs.value.includes(item)) {
    selectedPrefs.value = selectedPrefs.value.filter((pref) => pref !== item);
  } else {
    selectedPrefs.value.push(item);
  }
};
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  height: calc(100% - 112px);
  min-height: 0;
  align-content: center;
}

.segmented,
.pref-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.segmented button,
.pref-grid button {
  padding: 12px 16px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
}

.segmented .active,
.pref-grid .selected {
  background: var(--green);
}

.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  margin-top: 14px;
  font-weight: 1000;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
}

.switch-row input {
  width: 24px;
  height: 24px;
  accent-color: var(--green);
}

.range {
  width: 100%;
  margin-top: 26px;
  accent-color: var(--yellow);
}

.range-value {
  display: inline-block;
  padding: 10px 14px;
  margin: 18px 0 0;
  font-size: 24px;
  font-weight: 1000;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
}

@media (max-width: 900px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
