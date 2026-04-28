export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'waiting' | 'running' | 'done' | 'warning' | 'error';
  color: string;
  description: string;
  progress: number;
  outputSummary: string;
}

export const dashboardAgents: AgentInfo[] = [
  {
    id: 'profile-agent',
    name: '画像构建 Agent',
    role: '学习者理解',
    status: 'done',
    color: '#C6FF00',
    description: '持续识别基础、目标、资源偏好与薄弱点。',
    progress: 100,
    outputSummary: '已标记：图解偏好、信息增益薄弱。',
  },
  {
    id: 'course-agent',
    name: '课程分析 Agent',
    role: '知识拆解',
    status: 'done',
    color: '#00E5FF',
    description: '解析课程大纲并抽取关键知识点依赖关系。',
    progress: 100,
    outputSummary: '已提取决策树、剪枝、集成学习链路。',
  },
  {
    id: 'resource-agent',
    name: '资源生成 Agent',
    role: '多模态生成',
    status: 'running',
    color: '#FF00C8',
    description: '将需求拆分给文档、题库、代码案例等子 Agent。',
    progress: 72,
    outputSummary: '正在生成信息增益专项练习。',
  },
  {
    id: 'path-agent',
    name: '路径规划 Agent',
    role: '学习编排',
    status: 'running',
    color: '#FFE500',
    description: '按掌握度、时间约束与先修关系排序任务。',
    progress: 64,
    outputSummary: '建议先补图解，再做计算题。',
  },
  {
    id: 'assessment-agent',
    name: '评估反馈 Agent',
    role: '效果追踪',
    status: 'waiting',
    color: '#FF9800',
    description: '跟踪完成率、正确率并触发画像更新。',
    progress: 38,
    outputSummary: '等待今日练习数据回流。',
  },
];

export const arenaAgents: AgentInfo[] = [
  { id: 'input', name: '用户需求', role: 'INPUT', status: 'waiting', color: '#FFFFFF', description: '接收自然语言学习目标。', progress: 0, outputSummary: '等待启动' },
  { id: 'profile', name: '画像构建 Agent', role: 'PROFILE', status: 'waiting', color: '#C6FF00', description: '识别基础、偏好和薄弱点。', progress: 0, outputSummary: '待识别画像' },
  { id: 'course', name: '课程解析 Agent', role: 'COURSE', status: 'waiting', color: '#00E5FF', description: '拆解课程知识结构。', progress: 0, outputSummary: '待解析知识点' },
  { id: 'orchestrator', name: '资源总控 Agent', role: 'ORCH', status: 'waiting', color: '#FF00C8', description: '分发资源生成任务。', progress: 0, outputSummary: '待编排任务' },
  { id: 'doc', name: '文档生成 Agent', role: 'DOC', status: 'waiting', color: '#FFE500', description: '生成图解讲义。', progress: 0, outputSummary: '待生成文档' },
  { id: 'ppt', name: 'PPT 生成 Agent', role: 'PPT', status: 'waiting', color: '#8B5CF6', description: '生成课堂展示材料。', progress: 0, outputSummary: '待生成 PPT' },
  { id: 'quiz', name: '题库生成 Agent', role: 'QUIZ', status: 'waiting', color: '#FF9800', description: '生成针对性练习。', progress: 0, outputSummary: '待生成练习' },
  { id: 'mindmap', name: '思维导图 Agent', role: 'MAP', status: 'waiting', color: '#00E5FF', description: '生成知识结构图。', progress: 0, outputSummary: '待生成导图' },
  { id: 'code', name: '代码案例 Agent', role: 'CODE', status: 'waiting', color: '#C6FF00', description: '生成 sklearn 案例。', progress: 0, outputSummary: '待生成代码' },
  { id: 'path', name: '路径规划 Agent', role: 'PATH', status: 'waiting', color: '#FFE500', description: '编排学习闯关路线。', progress: 0, outputSummary: '待规划路径' },
  { id: 'assessment', name: '学习评估 Agent', role: 'SCORE', status: 'waiting', color: '#FF00C8', description: '设计评估反馈。', progress: 0, outputSummary: '待评估' },
  { id: 'safety', name: '安全审核 Agent', role: 'SAFE', status: 'waiting', color: '#FFFFFF', description: '检查事实与安全性。', progress: 0, outputSummary: '待审核' },
  { id: 'output', name: '最终资源输出', role: 'OUTPUT', status: 'waiting', color: '#C6FF00', description: '汇总资源卡片。', progress: 0, outputSummary: '待输出' },
];
