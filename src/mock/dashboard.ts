export interface DashboardTask {
  id: string;
  title: string;
  type: string;
  description: string;
  duration: string;
  progress: number;
  accent: 'blue' | 'violet' | 'green';
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface DashboardResource {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  duration: string;
  tags: string[];
  relatedKnowledge: string[];
  agent: string;
  status: '已生成' | '生成中' | '待审核';
  summary: string;
}

export interface KnowledgePreviewNode {
  id: string;
  label: string;
  status: 'mastered' | 'learning' | 'weak' | 'available' | 'locked';
  x: number;
  y: number;
}

export const dashboardTasks: DashboardTask[] = [
  {
    id: 'task-reading',
    title: '阅读图解决策树',
    type: '阅读',
    description: '用图解方式理解特征选择、划分节点与叶子节点。',
    duration: '18 min',
    progress: 70,
    accent: 'blue',
  },
  {
    id: 'task-practice',
    title: '完成 5 道信息增益练习',
    type: '练习',
    description: '围绕熵、条件熵、信息增益进行分步训练。',
    duration: '25 min',
    progress: 35,
    accent: 'violet',
  },
  {
    id: 'task-code',
    title: '跑通 sklearn 鸢尾花分类案例',
    type: '实操',
    description: '完成训练、可视化与模型评估的最小闭环。',
    duration: '40 min',
    progress: 10,
    accent: 'green',
  },
];

export const dashboardStats: DashboardStat[] = [
  { id: 'completion', label: '课程完成率', value: '42%', trend: '+8% 本周' },
  { id: 'mastery', label: '掌握度', value: '68%', trend: '信息增益待加强' },
  { id: 'streak', label: '连续学习', value: '6 天', trend: '保持节奏' },
  { id: 'resources', label: '已生成资源', value: '18 个', trend: '5 类资源已沉淀' },
];

export const recommendedResources: DashboardResource[] = [
  {
    id: 'res-visual-tree',
    title: '图解决策树',
    type: 'DOC',
    difficulty: '入门',
    duration: '16 min',
    tags: ['VISUAL', 'BASIC'],
    relatedKnowledge: ['决策树', '特征选择'],
    agent: '文档生成 Agent',
    status: '已生成',
    summary: '用可视化案例拆解决策树生成过程，适合先建立直觉。',
  },
  {
    id: 'res-info-gain',
    title: '信息增益练习',
    type: 'QUIZ',
    difficulty: '基础',
    duration: '22 min',
    tags: ['WEAK', 'QUIZ'],
    relatedKnowledge: ['信息增益', '熵'],
    agent: '题库生成 Agent',
    status: '生成中',
    summary: '根据最近错题生成 5 道阶梯式计算题。',
  },
  {
    id: 'res-random-forest',
    title: '随机森林阅读',
    type: 'READING',
    difficulty: '进阶',
    duration: '20 min',
    tags: ['FOREST', 'PLUS'],
    relatedKnowledge: ['随机森林', '投票机制'],
    agent: '课程分析 Agent',
    status: '已生成',
    summary: '从单棵树过渡到集成模型，解释 bagging 与投票。',
  },
  {
    id: 'res-sklearn',
    title: 'sklearn 实战',
    type: 'CODE',
    difficulty: '实践',
    duration: '35 min',
    tags: ['PYTHON', 'LAB'],
    relatedKnowledge: ['模型训练', '模型评估'],
    agent: '代码案例 Agent',
    status: '待审核',
    summary: '包含数据加载、训练、可视化和准确率评估。',
  },
];

export const knowledgePreviewNodes: KnowledgePreviewNode[] = [
  { id: 'ai', label: 'AI 概述', status: 'mastered', x: 10, y: 48 },
  { id: 'search', label: '搜索算法', status: 'mastered', x: 29, y: 28 },
  { id: 'dt', label: '决策树', status: 'learning', x: 48, y: 50 },
  { id: 'gain', label: '信息增益', status: 'weak', x: 66, y: 30 },
  { id: 'rf', label: '随机森林', status: 'locked', x: 91, y: 50 },
];
