<template>
  <div class="dashboard-page view-frame view-frame--locked">
    <Transition name="dashboard-switch" mode="out-in">
      <section v-if="dashboardMode === 'home'" key="home" class="dashboard-screen home-screen">
        <PageTitle
          title="AI 学习驾驶舱"
          subtitle="把知识混乱变成今天的一条通关路线"
          eyebrow="Learning Console"
        />

        <BrutalCard class="main-quest" color="var(--orange)" :tilt="-0.7">
          <div class="quest-copy">
            <span class="sticker">TODAY MAIN QUEST</span>
            <p class="player-line">李同学 / 人工智能导论</p>
            <h2>今晚攻克：决策树信息增益</h2>
            <p class="quest-desc">
              AI 已根据你的画像判断：你现在最该补强“特征选择”和“划分准则”。
            </p>
            <div class="hero-actions">
              <BrutalButton color="var(--green)" go="GO" @click="startQuest">START QUEST</BrutalButton>
              <BrutalButton color="var(--white)" go="↻" @click="replanQuest">让 AI 重新规划</BrutalButton>
            </div>
            <Transition name="notice-pop">
              <div v-if="replanNotice" class="replan-notice">{{ replanNotice }}</div>
            </Transition>
          </div>

          <div class="quest-meter" aria-label="今日任务进度">
            <div class="meter-ring">
              <strong>0/3</strong>
              <span>QUEST</span>
            </div>
            <div class="mastery-chip">
              <span>掌握度</span>
              <strong>68%</strong>
            </div>
          </div>
        </BrutalCard>

        <div class="status-strip" aria-label="学习状态">
          <span>课程完成率 <strong>42%</strong></span>
          <span>掌握度 <strong>68%</strong></span>
          <span>资源 <strong>18</strong></span>
          <span>连续 <strong>6 天</strong></span>
        </div>
      </section>

      <section v-else key="quest" class="dashboard-screen quest-screen">
        <div class="quest-stage-layout">
          <div class="quest-main-column">
            <button class="back-button" type="button" @click="backHome">← 返回驾驶舱</button>
            <div class="stage-title">
              <span class="sticker">QUEST STAGE</span>
              <h1>今日闯关任务</h1>
              <p>3 个步骤完成后，系统会自动更新你的学习画像。</p>
            </div>

            <div class="task-column" aria-label="今日闯关任务">
              <article
                v-for="(task, index) in tasks"
                :key="task.id"
                class="quest-task"
                :class="task.accent"
              >
                <span class="task-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <strong>{{ task.title }}</strong>
                  <p>{{ task.description }}</p>
                </div>
                <small>{{ task.duration }}</small>
              </article>
            </div>

            <div class="stage-progress">
              <strong>0/3</strong>
              <span>今日完成进度</span>
            </div>
          </div>

          <div class="quest-side-column">
            <BrutalCard class="stage-panel" color="var(--white)" :tilt="0.35">
              <div class="stage-tabs" role="tablist" aria-label="任务详情切换">
                <button
                  v-for="tab in stageTabs"
                  :key="tab.key"
                  class="stage-tab"
                  :class="{ active: activeStageTab === tab.key }"
                  type="button"
                  role="tab"
                  :aria-selected="activeStageTab === tab.key"
                  @click="activeStageTab = tab.key"
                >
                  {{ tab.label }}
                </button>
              </div>

              <Transition name="fade-slide" mode="out-in">
                <div :key="activeStageTab" class="stage-content allow-internal-scroll">
                  <template v-if="activeStageTab === 'agents'">
                    <article
                      v-for="agent in focusAgents"
                      :key="agent.id"
                      class="agent-card"
                      :class="[agent.status, { 'agent-running': agent.status === 'running' }]"
                      :style="{ background: agent.color }"
                    >
                      <StatusBadge
                        :label="agent.status.toUpperCase()"
                        :kind="agent.status === 'running' ? 'running' : agent.status === 'done' ? 'done' : 'waiting'"
                      />
                      <strong>{{ shortAgentName(agent.name) }}</strong>
                      <p>{{ agent.outputSummary }}</p>
                    </article>
                  </template>

                  <template v-else-if="activeStageTab === 'resources'">
                    <article v-for="resource in focusResources" :key="resource.id" class="resource-card">
                      <span class="soft-tag">{{ resource.type }}</span>
                      <h3>{{ resource.title }}</h3>
                      <p>{{ resource.summary }}</p>
                      <small>{{ resource.difficulty }} / {{ resource.duration }}</small>
                    </article>
                  </template>

                  <template v-else>
                    <div class="route-line">
                      <span>AI 概述</span>
                      <span>机器学习基础</span>
                      <span class="current">决策树</span>
                      <span class="locked">随机森林</span>
                    </div>
                  </template>
                </div>
              </Transition>
            </BrutalCard>

            <div class="stage-actions">
              <RouterLink class="entry-button cyan" to="/chat">进入 AI 对话 <b>→</b></RouterLink>
              <RouterLink class="entry-button magenta" to="/agents">打开 Agent Arena <b>→</b></RouterLink>
            </div>
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BrutalButton from '@/components/common/BrutalButton.vue';
import BrutalCard from '@/components/common/BrutalCard.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import { useAgentStore } from '@/stores/agentStore';
import { useLearningStore } from '@/stores/learningStore';

type DashboardMode = 'home' | 'quest';
type StageTab = 'agents' | 'resources' | 'route';

const dashboardMode = ref<DashboardMode>('home');
const activeStageTab = ref<StageTab>('agents');
const replanNotice = ref('');
let replanTimer: number | undefined;

const learning = useLearningStore();
const agentStore = useAgentStore();

const tasks = computed(() => learning.tasks.slice(0, 3));
const focusAgents = computed(() => agentStore.dashboardAgents.slice(0, 3));
const focusResources = computed(() =>
  learning.resources
    .filter((item) => ['图解决策树', '信息增益练习', 'sklearn 实战'].includes(item.title))
    .slice(0, 3),
);

const stageTabs: Array<{ key: StageTab; label: string }> = [
  { key: 'agents', label: 'Agent 小队' },
  { key: 'resources', label: '推荐资源' },
  { key: 'route', label: '知识路线' },
];

const startQuest = () => {
  activeStageTab.value = 'agents';
  dashboardMode.value = 'quest';
};

const backHome = () => {
  dashboardMode.value = 'home';
};

const replanQuest = () => {
  window.clearTimeout(replanTimer);
  replanNotice.value = 'AI 正在重新规划今日主线...';
  replanTimer = window.setTimeout(() => {
    replanNotice.value = '已更新：先补“特征选择”，再闯“信息增益”。';
  }, 650);
  replanTimer = window.setTimeout(() => {
    replanNotice.value = '';
  }, 1650);
};

const shortAgentName = (name: string) =>
  name
    .replace('画像构建 Agent', '画像 Agent')
    .replace('课程分析 Agent', '课程 Agent')
    .replace('资源生成 Agent', '资源 Agent');
</script>

<style scoped>
.dashboard-page {
  height: 100%;
  overflow: visible;
}

.dashboard-screen {
  display: grid;
  height: 100%;
  min-height: 0;
}

.home-screen {
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: clamp(16px, 2.4vh, 28px);
  max-width: 1280px;
  margin: 0 auto;
}

.main-quest {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(210px, 300px);
  gap: clamp(22px, 4vw, 46px);
  align-items: center;
  min-height: min(52vh, 480px);
  padding: clamp(28px, 4vw, 52px) !important;
}

.quest-copy {
  display: grid;
  gap: clamp(12px, 1.8vh, 20px);
  align-content: center;
}

.player-line {
  margin: 0;
  font-size: 15px;
  font-weight: 1000;
  text-transform: uppercase;
}

.main-quest h2 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(48px, 7vw, 102px);
  font-weight: 1000;
  line-height: 0.9;
  color: var(--white);
  text-shadow:
    5px 5px 0 var(--ink),
    -2px -2px 0 var(--ink),
    2px -2px 0 var(--ink),
    -2px 2px 0 var(--ink);
}

.quest-desc {
  max-width: 720px;
  margin: 0;
  font-size: clamp(17px, 1.7vw, 23px);
  font-weight: 1000;
  line-height: 1.42;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.replan-notice {
  justify-self: start;
  padding: 10px 13px;
  font-weight: 1000;
  background: var(--cyan);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
}

.quest-meter {
  display: grid;
  gap: 16px;
  justify-items: center;
}

.meter-ring {
  display: grid;
  width: clamp(178px, 20vw, 246px);
  aspect-ratio: 1;
  place-items: center;
  text-align: center;
  background:
    radial-gradient(circle at center, var(--white) 0 48%, transparent 49%),
    conic-gradient(var(--green) 0 0deg, var(--white) 0 360deg);
  border: 5px solid var(--ink);
  border-radius: 50%;
  box-shadow: 10px 10px 0 var(--ink);
}

.meter-ring strong {
  display: block;
  margin-top: 22px;
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 1000;
  line-height: 0.9;
}

.meter-ring span {
  display: block;
  margin-top: -30px;
  font-size: 13px;
  font-weight: 1000;
}

.mastery-chip,
.status-strip span {
  border: 4px solid var(--ink);
  box-shadow: var(--shadow-small);
}

.mastery-chip {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  background: var(--yellow);
  border-radius: 999px;
}

.mastery-chip span,
.mastery-chip strong {
  font-weight: 1000;
}

.mastery-chip strong {
  font-size: 24px;
}

.status-strip {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2px;
}

.status-strip span {
  padding: 9px 13px;
  font-size: 13px;
  font-weight: 1000;
  background: var(--white);
  border-width: 3px;
  border-radius: 999px;
}

.status-strip strong {
  margin-left: 5px;
}

.quest-screen {
  max-width: 1360px;
  margin: 0 auto;
}

.quest-stage-layout {
  display: grid;
  grid-template-columns: minmax(420px, 0.92fr) minmax(520px, 1.08fr);
  gap: clamp(22px, 3vw, 38px);
  height: 100%;
  min-height: 0;
  align-items: stretch;
}

.quest-main-column,
.quest-side-column {
  display: grid;
  min-height: 0;
}

.quest-main-column {
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 16px;
}

.quest-side-column {
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 16px;
  align-content: stretch;
}

.back-button {
  justify-self: start;
  min-height: 44px;
  padding: 0 14px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--white);
  border: 4px solid var(--ink);
  border-radius: 9px;
  box-shadow: var(--shadow-small);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.back-button:hover {
  box-shadow: 7px 7px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.stage-title h1 {
  margin: 8px 0 4px;
  font-size: clamp(42px, 5.5vw, 78px);
  font-weight: 1000;
  line-height: 0.9;
  color: var(--white);
  text-shadow:
    4px 4px 0 var(--ink),
    -2px -2px 0 var(--ink),
    2px -2px 0 var(--ink),
    -2px 2px 0 var(--ink);
}

.stage-title p {
  max-width: 520px;
  margin: 0;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.45;
}

.task-column {
  display: grid;
  gap: 13px;
  align-content: center;
  min-height: 0;
}

.quest-task {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  min-height: 118px;
  padding: 15px;
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--shadow-small);
}

.quest-task.blue {
  background: var(--cyan);
}

.quest-task.violet {
  color: var(--white);
  background: var(--purple);
}

.quest-task.green {
  background: var(--green);
}

.task-index {
  display: grid;
  width: 44px;
  height: 44px;
  color: var(--white);
  font-weight: 1000;
  place-items: center;
  background: var(--ink);
  border-radius: 50%;
}

.quest-task strong {
  display: block;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 1000;
  line-height: 1.05;
}

.quest-task p,
.quest-task small {
  margin: 7px 0 0;
  font-weight: 900;
  line-height: 1.35;
}

.stage-progress {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--yellow);
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--shadow-small);
}

.stage-progress strong {
  font-size: 34px;
  font-weight: 1000;
}

.stage-progress span {
  font-weight: 1000;
}

.stage-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
  padding: 18px !important;
}

.stage-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.stage-tab {
  min-height: 48px;
  padding: 0 12px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
}

.stage-tab.active {
  background: var(--green);
  box-shadow: 2px 2px 0 var(--ink);
  transform: translate(2px, 2px);
}

.stage-content {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  min-height: 0;
  overflow: auto;
  padding: 4px 4px 10px;
}

.agent-card,
.resource-card {
  min-height: 216px;
  padding: 15px;
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--shadow-small);
}

.agent-card {
  display: grid;
  gap: 12px;
  align-content: start;
}

.agent-card.running {
  outline: 4px solid var(--ink);
  outline-offset: 3px;
}

.agent-card strong,
.resource-card h3 {
  display: block;
  margin: 0;
  font-size: 24px;
  font-weight: 1000;
  line-height: 1.04;
}

.agent-card p,
.resource-card p,
.resource-card small {
  margin: 8px 0 0;
  font-weight: 900;
  line-height: 1.4;
}

.resource-card {
  background: var(--yellow);
}

.resource-card:nth-child(2) {
  background: var(--cyan);
}

.resource-card:nth-child(3) {
  color: var(--white);
  background: var(--magenta);
}

.resource-card h3 {
  margin-top: 15px;
}

.route-line {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: center;
  min-height: 250px;
}

.route-line span {
  position: relative;
  display: grid;
  min-height: 104px;
  padding: 12px;
  font-size: 18px;
  font-weight: 1000;
  text-align: center;
  place-items: center;
  background: var(--cyan);
  border: 4px solid var(--ink);
  border-radius: 12px;
  box-shadow: var(--shadow-small);
}

.route-line span:not(:last-child)::after {
  position: absolute;
  right: -28px;
  z-index: 2;
  width: 36px;
  height: 7px;
  content: "";
  background: var(--ink);
}

.route-line .current {
  color: var(--white);
  background: var(--magenta);
  transform: rotate(-2deg);
}

.route-line .locked {
  color: rgba(5, 5, 5, 0.58);
  background: var(--gray);
}

.stage-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.entry-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  padding: 0 16px;
  color: var(--ink);
  font-size: 17px;
  font-weight: 1000;
  background: var(--white);
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: 5px 5px 0 var(--ink);
  transition: transform 140ms ease, box-shadow 140ms ease;
}

.entry-button:hover {
  box-shadow: 7px 7px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.entry-button b {
  display: grid;
  width: 30px;
  height: 30px;
  color: var(--white);
  place-items: center;
  background: var(--ink);
  border-radius: 50%;
}

.entry-button.cyan {
  background: var(--cyan);
}

.entry-button.magenta {
  color: var(--white);
  background: var(--magenta);
}

.notice-pop-enter-active,
.notice-pop-leave-active {
  transition: opacity 220ms ease, transform 220ms var(--ease-pop);
}

.notice-pop-enter-from,
.notice-pop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.dashboard-switch-enter-active,
.dashboard-switch-leave-active {
  transition:
    opacity 420ms var(--ease-pop),
    transform 420ms var(--ease-pop);
  will-change: transform, opacity;
}

.dashboard-switch-enter-from {
  opacity: 0;
  transform: translateX(36px) scale(0.985);
}

.dashboard-switch-enter-to,
.dashboard-switch-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.dashboard-switch-leave-to {
  opacity: 0;
  transform: translateX(-36px) scale(0.985);
}

@media (max-width: 1180px) {
  .dashboard-page {
    overflow: visible;
  }

  .dashboard-screen {
    height: auto;
    min-height: 100%;
  }

  .main-quest,
  .quest-stage-layout {
    grid-template-columns: 1fr;
  }

  .quest-meter {
    justify-items: start;
  }

  .stage-content,
  .route-line {
    grid-template-columns: 1fr;
  }

  .route-line span:not(:last-child)::after {
    display: none;
  }
}

@media (max-width: 760px) {
  .main-quest h2 {
    font-size: 46px;
  }

  .stage-actions,
  .stage-tabs {
    grid-template-columns: 1fr;
  }
}
</style>
