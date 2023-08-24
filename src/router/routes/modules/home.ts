import type { AppRouteModule } from '/@/router/types';

export const homeChildren: AppRouteModule[] = [
  {
    path: '/about',
    name: 'About',
    component: () => import('/@/views/home/Home.vue'),
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
