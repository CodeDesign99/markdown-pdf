import type { AppRouteModule } from '/@/router/types';

export const homeChildren: AppRouteModule[] = [
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('/@/views/chat/Chat.vue'),
    meta: {}
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('/@/views/editor/Editor.vue'),
    meta: {}
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('/@/views/home/Home.vue'),
    meta: {}
  },
  {
    path: '/api',
    name: 'API',
    component: () => import('/@/views/home/Home.vue'),
    meta: {}
  },
]

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: () => import('/@/views/home/Home.vue'),
  meta: {},
  children: homeChildren,
};

export default home;
