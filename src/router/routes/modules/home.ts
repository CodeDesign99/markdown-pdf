import type { AppRouteModule } from '/@/router/types';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: () => import('/@/views/home/Home.vue'),
  meta: {},
  children: [],
};

export default home;
