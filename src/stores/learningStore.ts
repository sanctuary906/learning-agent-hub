import { defineStore } from 'pinia';
import { dashboardTasks, dashboardStats, recommendedResources, knowledgePreviewNodes } from '@/mock/dashboard';

export const useLearningStore = defineStore('learning', {
  state: () => ({
    tasks: dashboardTasks,
    stats: dashboardStats,
    resources: recommendedResources,
    knowledgePreviewNodes,
  }),
});
