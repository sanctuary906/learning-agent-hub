export type KnowledgeStatus = 'LOCKED' | 'AVAILABLE' | 'LEARNING' | 'MASTERED' | 'WEAK' | 'REVIEW';

export const knowledgeMapNodes = [
  { id: 'ai', label: 'AI 概述', status: 'MASTERED' as KnowledgeStatus, mastery: 92, prerequisites: [], resources: ['课程导论图谱'], x: 4, y: 48 },
  { id: 'search', label: '搜索算法', status: 'MASTERED' as KnowledgeStatus, mastery: 86, prerequisites: ['AI 概述'], resources: ['搜索算法速通'], x: 18, y: 28 },
  { id: 'blind', label: '盲目搜索', status: 'REVIEW' as KnowledgeStatus, mastery: 72, prerequisites: ['搜索算法'], resources: ['BFS/DFS 对比卡'], x: 32, y: 18 },
  { id: 'heuristic', label: '启发式搜索', status: 'AVAILABLE' as KnowledgeStatus, mastery: 55, prerequisites: ['搜索算法'], resources: ['启发函数图解'], x: 32, y: 48 },
  { id: 'astar', label: 'A* 算法', status: 'LOCKED' as KnowledgeStatus, mastery: 20, prerequisites: ['启发式搜索'], resources: ['A* 可视化案例'], x: 45, y: 33 },
  { id: 'ml', label: '机器学习基础', status: 'MASTERED' as KnowledgeStatus, mastery: 78, prerequisites: ['AI 概述'], resources: ['ML 总览'], x: 45, y: 70 },
  { id: 'tree', label: '决策树', status: 'LEARNING' as KnowledgeStatus, mastery: 58, prerequisites: ['机器学习基础'], resources: ['图解决策树'], x: 58, y: 56 },
  { id: 'gain', label: '信息增益', status: 'WEAK' as KnowledgeStatus, mastery: 38, prerequisites: ['决策树'], resources: ['信息增益练习题'], x: 70, y: 38 },
  { id: 'prune', label: '剪枝策略', status: 'AVAILABLE' as KnowledgeStatus, mastery: 44, prerequisites: ['决策树'], resources: ['剪枝策略 PPT'], x: 72, y: 68 },
  { id: 'forest', label: '随机森林', status: 'LOCKED' as KnowledgeStatus, mastery: 18, prerequisites: ['信息增益', '剪枝策略'], resources: ['随机森林阅读'], x: 86, y: 50 },
  { id: 'eval', label: '模型评估', status: 'AVAILABLE' as KnowledgeStatus, mastery: 52, prerequisites: ['机器学习基础'], resources: ['评估指标卡'], x: 88, y: 76 },
  { id: 'project', label: '项目实战', status: 'LOCKED' as KnowledgeStatus, mastery: 0, prerequisites: ['随机森林', '模型评估'], resources: ['sklearn 实战'], x: 96, y: 62 },
];
