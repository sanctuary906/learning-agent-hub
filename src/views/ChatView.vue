<template>
  <div class="chat-view view-frame">
    <PageTitle title="AI CHAT 控制台" subtitle="输入学习混乱点，AI 小队会把它变成资源和路线。" eyebrow="Dialogue Play" />
    <section class="chat-layout">
      <BrutalCard class="chat-side-panel" color="var(--yellow)" :tilt="-0.5">
        <h3 class="panel-title">历史任务</h3>
        <button v-for="item in histories" :key="item" class="history-btn" type="button">{{ item }}</button>
      </BrutalCard>

      <BrutalCard class="chat-panel" color="var(--white)" :tilt="0.3">
        <div class="quick-row">
          <button v-for="prompt in quickPrompts" :key="prompt" class="ghost-button" type="button" @click="draft = prompt">
            {{ prompt }}
          </button>
        </div>
        <div class="messages allow-internal-scroll">
          <article v-for="message in messages" :key="message.id" class="bubble" :class="message.role">
            <span v-if="message.role === 'thinking'" class="sticker">THINKING...</span>
            <StreamingText :text="message.content" />
          </article>
          <div v-if="generatedCards.length" class="generated-grid">
            <article v-for="card in generatedCards" :key="card" class="result-card">
              <span class="soft-tag">READY</span>
              <strong>{{ card }}</strong>
              <small>已加入资源补给站</small>
            </article>
          </div>
        </div>
        <form class="input-row" @submit.prevent="sendMessage">
          <input v-model="draft" class="arcade-input" placeholder="告诉 AI：你想学什么、哪里不会、想生成什么资源..." />
          <BrutalButton color="var(--cyan)" go=">">SEND</BrutalButton>
        </form>
      </BrutalCard>

      <BrutalCard class="chat-context-panel" color="var(--green)" :tilt="0.8">
        <h3 class="panel-title">任务上下文</h3>
        <p class="context">目标：两周掌握决策树和随机森林。偏好：图解 + 代码案例。</p>
        <div class="agent-call allow-internal-scroll">
          <article v-for="agent in chatAgents" :key="agent.name" :class="[agent.status, { 'agent-running': agent.status === 'RUNNING' }]">
            <StatusBadge :label="agent.status" :kind="agent.status === 'RUNNING' ? 'running' : agent.status === 'DONE' ? 'done' : 'waiting'" />
            <strong>{{ agent.name }}</strong>
          </article>
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
import StatusBadge from '@/components/common/StatusBadge.vue';
import StreamingText from '@/components/chat/StreamingText.vue';

type ChatRole = 'user' | 'ai' | 'thinking';
interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
}

const histories = ['决策树两周通关', 'A* 算法补课', '生成 sklearn 案例'];
const quickPrompts = ['生成学习路径', '根据薄弱点出题', '生成 PPT', '生成代码案例', '解释知识点'];
const draft = ref('我想两周内学会决策树和随机森林，我基础比较弱，希望多给我图解和代码案例。');
const messages = ref<ChatMessage[]>([
  { id: 1, role: 'ai', content: '你好，我是灵知。告诉我你想闯哪一关，我会召集 Agent 小队。' },
]);
const chatAgents = ref([
  { name: '画像 Agent', status: 'WAITING' },
  { name: '课程 Agent', status: 'WAITING' },
  { name: '资源 Agent', status: 'WAITING' },
  { name: '路径 Agent', status: 'WAITING' },
]);
const generatedCards = ref<string[]>([]);
let id = 2;

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const sendMessage = async () => {
  if (!draft.value.trim()) return;
  const text = draft.value;
  draft.value = '';
  generatedCards.value = [];
  messages.value.push({ id: id++, role: 'user', content: text });
  messages.value.push({ id: id++, role: 'thinking', content: '正在分析你的学习需求...' });

  for (const agent of chatAgents.value) {
    agent.status = 'RUNNING';
    await sleep(420);
    agent.status = 'DONE';
  }

  messages.value = messages.value.filter((item) => item.role !== 'thinking');
  const aiMessage: ChatMessage = { id: id++, role: 'ai', content: '' };
  messages.value.push(aiMessage);
  const output = [
    '已识别你的学习目标：**两周掌握决策树与随机森林**。',
    '正在生成个性化学习路径：先决策树概念，再信息增益计算，最后进入随机森林。',
    '正在生成图解讲义、题库和代码案例，并把薄弱点标记为高优先级。',
    '完成！你获得 4 张资源卡，可以直接加入今日闯关路线。',
  ].join('\n\n');
  for (const char of output) {
    aiMessage.content += char;
    await sleep(16);
  }
  generatedCards.value = ['个性化学习路径', '决策树图解讲义', '信息增益练习题', 'sklearn 代码实战案例'];
};
</script>

<style scoped>
.chat-layout {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 300px;
  gap: 20px;
  height: calc(100% - 108px);
  min-height: 0;
  align-items: stretch;
}

.chat-side-panel,
.chat-context-panel {
  display: grid;
  align-content: start;
}

.history-btn,
.agent-call article,
.bubble,
.result-card {
  border: 3px solid var(--ink);
  border-radius: 9px;
  box-shadow: 4px 4px 0 var(--ink);
}

.history-btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  font-weight: 1000;
  text-align: left;
  cursor: pointer;
  background: var(--white);
}

.chat-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 14px;
  min-height: 0;
}

.quick-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.messages {
  display: grid;
  gap: 14px;
  align-content: start;
  min-height: 0;
  padding: 8px;
  overflow-y: auto;
}

.bubble {
  max-width: 78%;
  padding: 14px;
  font-weight: 800;
  background: var(--white);
  animation: message-pop 220ms var(--ease-pop) both;
  will-change: transform, opacity;
}

.bubble.user {
  justify-self: end;
  background: var(--cyan);
}

.bubble.ai {
  justify-self: start;
  background: var(--white);
}

.bubble.thinking {
  justify-self: start;
  background: var(--magenta);
  color: var(--white);
  animation: message-pop 220ms var(--ease-pop) both, status-pulse 1.2s ease-in-out infinite;
}

.input-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
}

.context {
  font-weight: 900;
  line-height: 1.55;
}

.agent-call {
  display: grid;
  gap: 12px;
  min-height: 0;
  overflow: auto;
}

.agent-call article {
  display: grid;
  gap: 8px;
  padding: 12px;
  background: var(--white);
}

.agent-call article.RUNNING {
  background: var(--cyan);
}

.agent-call article.DONE {
  background: var(--green);
}

.generated-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.result-card {
  padding: 12px;
  background: var(--yellow);
}

.result-card strong,
.result-card small {
  display: block;
  margin-top: 8px;
  font-weight: 1000;
}

@media (max-width: 1180px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }
}
</style>
