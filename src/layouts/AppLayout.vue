<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <aside class="sidebar allow-internal-scroll">
      <button
        class="sidebar-toggle"
        type="button"
        :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleSidebar"
      >
        {{ sidebarCollapsed ? '>' : '<' }}
      </button>

      <RouterLink class="logo" to="/dashboard" :title="sidebarCollapsed ? 'Lingzhi Learning Agent Hub' : undefined">
        <strong class="logo-mark">{{ sidebarCollapsed ? 'LZ' : '灵知' }}</strong>
        <span class="sidebar-label">Learning Agent Hub</span>
      </RouterLink>

      <nav>
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          class="nav-button"
          :to="item.path"
          :title="sidebarCollapsed ? item.label : undefined"
        >
          <component :is="item.icon" />
          <span class="sidebar-label nav-label">{{ item.label }}</span>
          <i v-if="item.notice" class="nav-dot" aria-hidden="true" />
        </RouterLink>
      </nav>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="topbar-left">
          <div class="status-pill">当前课程：{{ app.currentCourse }}</div>
          <div class="status-pill green">Lv.6</div>
          <div class="status-pill cyan">XP 1280</div>
          <div class="status-pill yellow">连续 6 天</div>
        </div>
        <div class="topbar-right">
          <button class="mini-action" type="button">+ 生成资源</button>
          <div class="user-chip">李同学</div>
        </div>
      </header>
      <div class="content allow-internal-scroll">
        <span class="decor-star" />
        <span class="decor-plus" />
        <span class="decor-dot" />
        <div class="route-stage">
          <RouterView v-slot="{ Component, route }">
            <Transition
              name="route-pop"
              :css="false"
              @before-enter="onRouteBeforeEnter"
              @enter="onRouteEnter"
              @after-enter="onRouteAfterEnter"
              @before-leave="onRouteBeforeLeave"
              @leave="onRouteLeave"
              @after-leave="onRouteAfterLeave"
            >
              <div class="route-page-shell" :key="route.fullPath">
                <component :is="Component" />
              </div>
            </Transition>
          </RouterView>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  ChatDotRound,
  DataAnalysis,
  Grid,
  MapLocation,
  Menu,
  Setting,
  User,
  VideoPlay,
} from '@element-plus/icons-vue';
import { useAppStore } from '@/stores/appStore';

const app = useAppStore();
const route = useRoute();
const sidebarCollapsed = ref(window.localStorage.getItem('sidebarCollapsed') === 'true'
  || window.localStorage.getItem('lingzhi-sidebar-collapsed') === 'true');

const setSidebarCollapsed = (value: boolean) => {
  sidebarCollapsed.value = value;
  window.localStorage.setItem('sidebarCollapsed', String(value));
  window.localStorage.setItem('lingzhi-sidebar-collapsed', String(value));
};

const toggleSidebar = () => {
  setSidebarCollapsed(!sidebarCollapsed.value);
};

const logRouteTransition = (stage: string) => {
  if (import.meta.env.DEV) {
    console.log(`[route-pop] ${stage} (${routeDirection.value})`);
  }
};

const navItems = [
  { path: '/dashboard', label: '学习驾驶舱', icon: Menu },
  { path: '/chat', label: 'AI 对话', icon: ChatDotRound, notice: true },
  { path: '/agents', label: 'Agent Arena', icon: VideoPlay },
  { path: '/profile', label: '画像升级', icon: User },
  { path: '/map', label: '知识地图', icon: MapLocation },
  { path: '/resources', label: '资源补给站', icon: Grid },
  { path: '/assessment', label: '学习战绩', icon: DataAnalysis },
  { path: '/settings', label: '游戏设置', icon: Setting },
];

type RouteDirection = 'down' | 'up' | 'neutral';

const routeDirection = ref<RouteDirection>('neutral');

const getRouteIndex = (path: string) => navItems.findIndex((item) => item.path === path);

watch(
  () => route.path,
  (toPath, fromPath) => {
    const toIndex = getRouteIndex(toPath);
    const fromIndex = getRouteIndex(fromPath);

    if (toIndex < 0 || fromIndex < 0 || toIndex === fromIndex) {
      routeDirection.value = 'neutral';
    } else {
      routeDirection.value = toIndex > fromIndex ? 'down' : 'up';
    }
  },
  { flush: 'sync' },
);

const routeTransitionOptions: KeyframeAnimationOptions = {
  duration: 360,
  easing: 'cubic-bezier(.22, .8, .24, 1)',
  fill: 'both',
};

const getEnterFromTransform = () => {
  if (routeDirection.value === 'down') return 'translate3d(0, 34px, 0) scale(.985)';
  if (routeDirection.value === 'up') return 'translate3d(0, -34px, 0) scale(.985)';
  return 'translate3d(24px, 8px, 0) scale(.985)';
};

const getLeaveToTransform = () => {
  if (routeDirection.value === 'down') return 'translate3d(0, -22px, 0) scale(.985)';
  if (routeDirection.value === 'up') return 'translate3d(0, 22px, 0) scale(.985)';
  return 'translate3d(-20px, -6px, 0) scale(.985)';
};

const clearRouteTransition = (el: Element) => {
  const node = el as HTMLElement;
  node.style.transition = '';
  node.style.opacity = '';
  node.style.transform = '';
  node.style.filter = '';
  node.style.position = '';
  node.style.inset = '';
  node.style.width = '';
  node.style.zIndex = '';
  node.style.pointerEvents = '';
};

const onRouteBeforeEnter = (el: Element) => {
  logRouteTransition('before-enter');
  const node = el as HTMLElement;
  node.style.opacity = '0';
  node.style.transform = getEnterFromTransform();
  node.style.filter = 'saturate(.94)';
  node.style.zIndex = '2';
};

const onRouteEnter = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  const animation = node.animate(
    [
      {
        opacity: 0,
        transform: getEnterFromTransform(),
        filter: 'saturate(.94)',
      },
      {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        filter: 'saturate(1)',
      },
    ],
    routeTransitionOptions,
  );
  animation.addEventListener('finish', done, { once: true });
  animation.addEventListener('cancel', done, { once: true });
};

const onRouteAfterEnter = (el: Element) => {
  logRouteTransition('after-enter');
  clearRouteTransition(el);
};

const onRouteBeforeLeave = (el: Element) => {
  logRouteTransition('before-leave');
  const node = el as HTMLElement;
  const rect = node.getBoundingClientRect();
  node.style.position = 'absolute';
  node.style.inset = '0 auto auto 0';
  node.style.width = `${rect.width}px`;
  node.style.zIndex = '1';
  node.style.pointerEvents = 'none';
};

const onRouteLeave = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  const animation = node.animate(
    [
      {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        filter: 'saturate(1)',
      },
      {
        opacity: 0,
        transform: getLeaveToTransform(),
        filter: 'saturate(.94)',
      },
    ],
    routeTransitionOptions,
  );
  animation.addEventListener('finish', done, { once: true });
  animation.addEventListener('cancel', done, { once: true });
};

const onRouteAfterLeave = (el: Element) => {
  logRouteTransition('after-leave');
  clearRouteTransition(el);
};

onMounted(() => {
  if (import.meta.env.DEV) {
    console.log(
      'prefers-reduced-motion:',
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }

  const hasSavedPreference = window.localStorage.getItem('sidebarCollapsed') !== null
    || window.localStorage.getItem('lingzhi-sidebar-collapsed') !== null;
  if (!hasSavedPreference && window.innerWidth <= 980) {
    setSidebarCollapsed(true);
  }
});

</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  height: 100vh;
  min-height: 0;
  transition: grid-template-columns var(--duration-base) var(--ease-press);
}

.app-layout.sidebar-collapsed {
  grid-template-columns: var(--sidebar-collapsed-width) minmax(0, 1fr);
}

.sidebar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100vh;
  padding: 18px 14px;
  background: var(--yellow);
  border-right: 5px solid var(--ink);
}

.sidebar-collapsed .sidebar {
  padding-inline: 10px;
}

.sidebar-toggle {
  align-self: flex-end;
  width: 42px;
  height: 38px;
  color: var(--ink);
  font-size: 20px;
  font-weight: 1000;
  cursor: pointer;
  background: var(--green);
  border: 3px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 var(--ink);
  transform-origin: center;
  transition: transform var(--duration-fast) var(--ease-press), box-shadow var(--duration-fast) var(--ease-press);
  will-change: transform;
}

.sidebar-toggle:hover {
  box-shadow: 6px 6px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.sidebar-toggle:active {
  box-shadow: 1px 1px 0 var(--ink);
  transform: translate(3px, 3px);
}

.sidebar-collapsed .sidebar-toggle {
  align-self: center;
}

.logo {
  position: relative;
  display: grid;
  gap: 4px;
  min-height: 86px;
  padding: 16px;
  color: var(--ink);
  background: var(--white);
  border: 4px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--shadow-small);
  transform: rotate(-1deg);
  transform-origin: center;
  transition: transform var(--duration-base) var(--ease-press), box-shadow var(--duration-base) var(--ease-press);
}

.sidebar-collapsed .logo {
  min-height: 62px;
  padding: 10px 0;
  place-items: center;
}

.logo-mark {
  font-size: 34px;
  font-weight: 1000;
  line-height: 1;
  white-space: nowrap;
}

.logo span {
  font-size: 13px;
  font-weight: 1000;
  text-transform: uppercase;
}

nav {
  display: grid;
  gap: 11px;
}

.nav-button {
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 46px;
  padding: 0 12px;
  color: var(--ink);
  font-weight: 1000;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 9px;
  box-shadow: 4px 4px 0 var(--ink);
  transform-origin: center;
  transition: transform var(--duration-fast) var(--ease-press), box-shadow var(--duration-fast) var(--ease-press), background var(--duration-fast) ease;
  will-change: transform;
}

.nav-button:hover {
  box-shadow: 6px 6px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.nav-button.router-link-active {
  background: var(--green);
  box-shadow: 6px 6px 0 var(--ink);
}

.sidebar-collapsed .nav-button {
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 0;
}

.nav-button :deep(svg) {
  width: 18px;
  height: 18px;
}

.sidebar-label {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  transition: opacity var(--duration-fast) ease, transform var(--duration-fast) ease;
}

.sidebar-collapsed .sidebar-label {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-6px);
}

.sidebar-collapsed .nav-label,
.sidebar-collapsed .logo .sidebar-label {
  position: absolute;
  width: 1px;
}

.nav-dot {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 13px;
  height: 13px;
  pointer-events: none;
  background: var(--magenta);
  border: 3px solid var(--ink);
  border-radius: 50%;
  box-shadow: 2px 2px 0 var(--ink);
}

.main {
  position: relative;
  display: grid;
  grid-template-rows: var(--header-height) minmax(0, 1fr);
  min-width: 0;
  min-height: 0;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
  padding: 14px clamp(24px, 4vw, 48px);
  background: rgba(247, 247, 242, 0.9);
  border-bottom: 5px solid var(--ink);
  backdrop-filter: blur(8px);
}

.topbar-left,
.topbar-right {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.status-pill,
.user-chip,
.mini-action {
  padding: 9px 12px;
  font-weight: 1000;
  background: var(--white);
  border: 3px solid var(--ink);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--ink);
}

.status-pill.green {
  background: var(--green);
}

.status-pill.cyan {
  background: var(--cyan);
}

.status-pill.yellow {
  background: var(--yellow);
}

.mini-action {
  cursor: pointer;
  color: var(--white);
  background: var(--magenta);
  border-radius: 9px;
  transition: transform var(--duration-fast) var(--ease-press), box-shadow var(--duration-fast) var(--ease-press);
  will-change: transform;
}

.mini-action:hover {
  box-shadow: 5px 5px 0 var(--ink);
  transform: translate(-2px, -2px);
}

.mini-action:active {
  box-shadow: 1px 1px 0 var(--ink);
  transform: translate(3px, 3px);
}

.content {
  position: relative;
  z-index: 1;
  min-height: 0;
  padding: clamp(28px, 4vw, 58px);
}

.route-stage {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-x: clip;
}

.route-stage > * {
  min-width: 0;
}

.route-page-shell {
  width: 100%;
  min-width: 0;
  min-height: 100%;
  outline: 0 solid transparent;
  transform-origin: center top;
  will-change: opacity, transform, filter;
}

@media (max-width: 980px) {
  .app-layout {
    grid-template-columns: var(--sidebar-collapsed-width) minmax(0, 1fr);
  }

  .sidebar:not(:hover) .sidebar-label {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-6px);
  }

  .sidebar {
    padding-inline: 10px;
  }

  .logo {
    min-height: 56px;
    padding: 9px 0;
    place-items: center;
  }

  .nav-button {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 0;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
