import type { RouteLocationNormalizedLoaded } from 'vue-router';

const CLIP_SELECTORS = [
  '.page',
  '.dashboard-page',
  '.quest-stage',
  '.chat-page',
  '.chat-view',
  '.agents-page',
  '.agents-view',
  '.profile-page',
  '.profile-view',
  '.map-page',
  '.map-view',
  '.resources-page',
  '.resources-view',
  '.assessment-page',
  '.assessment-view',
  '.settings-page',
  '.settings-view',
  '.brutal-card',
  '.resource-card',
  '.supply-card',
  '.agent-card',
  '.quest-card',
  '.quest-task',
  'button',
];

const SCROLL_SELECTORS = [
  '.content',
  '.allow-internal-scroll',
  '.messages',
  '.logs',
  '.resource-list',
  '.arena-board',
  '.map-board',
  '.analysis-content',
  '.log-list',
];

const describeElement = (element: HTMLElement) => ({
  tag: element.tagName.toLowerCase(),
  id: element.id || '',
  className: element.className?.toString() || '',
  text: element.innerText?.trim().slice(0, 60) || '',
  scrollHeight: element.scrollHeight,
  clientHeight: element.clientHeight,
  scrollWidth: element.scrollWidth,
  clientWidth: element.clientWidth,
});

export const checkPageOverflow = (route: RouteLocationNormalizedLoaded) => {
  if (!import.meta.env.DEV) return;

  window.setTimeout(() => {
    const viewportHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;
    const bodyOverflowing = bodyHeight > viewportHeight + 4;

    const scrollContainers = SCROLL_SELECTORS.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element) => ({
        selector,
        ...describeElement(element),
        overflowingY: element.scrollHeight > element.clientHeight + 4,
        overflowingX: element.scrollWidth > element.clientWidth + 4,
        allowed: element.classList.contains('allow-internal-scroll'),
      })),
    );

    if (bodyOverflowing) {
      console.warn('当前页面可能出现浏览器级滚动，请检查布局。', {
        route: route.fullPath,
        viewportHeight,
        bodyHeight,
        scrollContainers,
      });
    } else {
      console.info('[layout-check]', {
        route: route.fullPath,
        viewportHeight,
        bodyHeight,
        scrollContainers,
      });
    }

    const checked = new Set<HTMLElement>();
    const clippedElements = CLIP_SELECTORS.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).flatMap((element) => {
        if (checked.has(element)) return [];
        checked.add(element);
        if (element.classList.contains('allow-internal-scroll')) return [];

        const verticalClip = element.scrollHeight > element.clientHeight + 4;
        const horizontalClip = element.scrollWidth > element.clientWidth + 4;
        if (!verticalClip && !horizontalClip) return [];

        return [
          {
            selector,
            verticalClip,
            horizontalClip,
            ...describeElement(element),
          },
        ];
      }),
    );

    clippedElements.forEach((item) => {
      console.warn('检测到可能被裁切的内容：selector / className / scrollHeight / clientHeight', item);
    });
  }, 80);
};
