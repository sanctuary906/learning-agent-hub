import { defineStore } from 'pinia';

const readSidebarState = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('lingzhi-sidebar-collapsed') === 'true';
};

export const useAppStore = defineStore('app', {
  state: () => ({
    currentCourse: '人工智能导论',
    currentStudent: '计算机专业 大二',
    studentName: '李同学',
    streamingEnabled: true,
    agentVisualizationEnabled: true,
    sidebarCollapsed: readSidebarState(),
  }),
  actions: {
    setSidebarCollapsed(value: boolean) {
      this.sidebarCollapsed = value;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lingzhi-sidebar-collapsed', String(value));
      }
    },
    toggleSidebar() {
      this.setSidebarCollapsed(!this.sidebarCollapsed);
    },
  },
});
