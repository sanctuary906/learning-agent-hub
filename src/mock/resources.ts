export interface ResourceItem {
  id: string;
  title: string;
  type: 'DOC' | 'PPT' | 'QUIZ' | 'MINDMAP' | 'VIDEO' | 'CODE' | 'READING';
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'PRACTICE';
  duration: string;
  tags: string[];
  relatedKnowledge: string[];
  agent: string;
  status: 'READY' | 'GENERATING' | 'REVIEWING';
  color: string;
}

export const resources: ResourceItem[] = [
  { id: 'r1', title: '图解决策树', type: 'DOC', difficulty: 'EASY', duration: '16 min', tags: ['VISUAL', 'BASIC'], relatedKnowledge: ['决策树'], agent: '文档 Agent', status: 'READY', color: '#C6FF00' },
  { id: 'r2', title: '信息增益练习', type: 'QUIZ', difficulty: 'NORMAL', duration: '22 min', tags: ['WEAK', 'QUIZ'], relatedKnowledge: ['信息增益'], agent: '题库 Agent', status: 'GENERATING', color: '#FF9800' },
  { id: 'r3', title: '随机森林阅读', type: 'READING', difficulty: 'HARD', duration: '20 min', tags: ['FOREST', 'PLUS'], relatedKnowledge: ['随机森林'], agent: '课程 Agent', status: 'READY', color: '#00E5FF' },
  { id: 'r4', title: 'sklearn 实战', type: 'CODE', difficulty: 'PRACTICE', duration: '35 min', tags: ['PYTHON', 'LAB'], relatedKnowledge: ['模型评估'], agent: '代码 Agent', status: 'REVIEWING', color: '#FF00C8' },
  { id: 'r5', title: '剪枝策略速通 PPT', type: 'PPT', difficulty: 'NORMAL', duration: '12 min', tags: ['PPT', 'REVIEW'], relatedKnowledge: ['剪枝策略'], agent: 'PPT Agent', status: 'READY', color: '#FFE500' },
  { id: 'r6', title: '机器学习路线导图', type: 'MINDMAP', difficulty: 'EASY', duration: '10 min', tags: ['MAP', 'PATH'], relatedKnowledge: ['机器学习基础'], agent: '导图 Agent', status: 'READY', color: '#8B5CF6' },
  { id: 'r7', title: 'A* 算法视频脚本', type: 'VIDEO', difficulty: 'NORMAL', duration: '18 min', tags: ['SCRIPT', 'SEARCH'], relatedKnowledge: ['A* 算法'], agent: '视频脚本 Agent', status: 'READY', color: '#FFFFFF' },
];
