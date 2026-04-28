import { defineStore } from 'pinia';
import { dashboardAgents } from '@/mock/agents';

export const useAgentStore = defineStore('agents', {
  state: () => ({
    dashboardAgents,
  }),
});
