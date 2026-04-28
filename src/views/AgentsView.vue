<template>
  <div class="agents-view view-frame">
    <PageTitle title="AGENT ARENA" subtitle="看见 AI 小队如何协作完成学习任务" eyebrow="Multi-agent Battle" />
    <div class="arena-actions">
      <BrutalButton color="var(--green)" go="> " @click="start">START</BrutalButton>
      <BrutalButton color="var(--yellow)" @click="reset">RESET</BrutalButton>
      <BrutalButton color="var(--magenta)" go="OK">EXPORT RESULT</BrutalButton>
    </div>
    <section class="agents-layout">
      <AgentArena :agents="agents" />
      <BrutalCard class="log-card" color="var(--yellow)" :tilt="0.8">
        <h3 class="panel-title">实时协作日志</h3>
        <div class="logs allow-internal-scroll">
          <p v-for="log in logs" :key="log">{{ log }}</p>
        </div>
      </BrutalCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AgentArena from '@/components/agents/AgentArena.vue';
import BrutalButton from '@/components/common/BrutalButton.vue';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import { arenaAgents, type AgentInfo } from '@/mock/agents';

const clone = (): AgentInfo[] => arenaAgents.map((agent) => ({ ...agent }));
const agents = ref(clone());
const logs = ref<string[]>(['[12:00] 等待 START，Agent 小队已就位。']);
let running = false;

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
const lines = [
  '画像 Agent 识别弱点：信息增益',
  '课程 Agent 提取知识点：剪枝、集成学习',
  '题库 Agent 生成 10 道练习',
  '代码 Agent 生成 sklearn 鸢尾花案例',
  '安全审核 Agent 通过内容检查',
  '路径 Agent 解锁下一关：随机森林',
];

const start = async () => {
  if (running) return;
  running = true;
  logs.value = ['[12:01] START! 协作竞技场启动。'];
  for (let index = 0; index < agents.value.length; index += 1) {
    agents.value[index].status = 'running';
    agents.value[index].progress = 60;
    await sleep(360);
    agents.value[index].status = 'done';
    agents.value[index].progress = 100;
    logs.value.unshift(`[12:${String(index + 2).padStart(2, '0')}] ${lines[index % lines.length]}`);
  }
  running = false;
};

const reset = () => {
  agents.value = clone();
  logs.value = ['[12:00] 流程已重置，等待 START。'];
  running = false;
};
</script>

<style scoped>
.arena-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.agents-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 22px;
  height: calc(100% - 150px);
  min-height: 0;
}

.log-card {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
}

.logs {
  display: grid;
  gap: 10px;
  min-height: 0;
  margin-top: 18px;
  overflow: auto;
}

.logs p {
  margin: 0;
  padding: 12px;
  font-weight: 900;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
}

@media (max-width: 1180px) {
  .agents-layout {
    grid-template-columns: 1fr;
  }
}
</style>
