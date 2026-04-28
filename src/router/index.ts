import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import DashboardView from '@/views/DashboardView.vue';
import ChatView from '@/views/ChatView.vue';
import AgentsView from '@/views/AgentsView.vue';
import ProfileView from '@/views/ProfileView.vue';
import KnowledgeMapView from '@/views/KnowledgeMapView.vue';
import ResourcesView from '@/views/ResourcesView.vue';
import AssessmentView from '@/views/AssessmentView.vue';
import SettingsView from '@/views/SettingsView.vue';
import { checkPageOverflow } from '@/utils/checkPageOverflow';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      redirect: '/dashboard',
      children: [
        { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { title: '学习驾驶舱' } },
        { path: 'chat', name: 'chat', component: ChatView, meta: { title: 'AI 对话' } },
        { path: 'agents', name: 'agents', component: AgentsView, meta: { title: '智能体协作' } },
        { path: 'profile', name: 'profile', component: ProfileView, meta: { title: '学习画像' } },
        { path: 'map', name: 'map', component: KnowledgeMapView, meta: { title: '知识地图' } },
        { path: 'resources', name: 'resources', component: ResourcesView, meta: { title: '资源库' } },
        { path: 'assessment', name: 'assessment', component: AssessmentView, meta: { title: '学习评估' } },
        { path: 'settings', name: 'settings', component: SettingsView, meta: { title: '系统设置' } },
      ],
    },
  ],
});

router.afterEach((to) => {
  checkPageOverflow(to);
});

export default router;
