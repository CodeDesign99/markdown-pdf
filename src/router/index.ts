import type { App } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router"
import Login from "/@/views/login/login.vue"
import Home from '/@/views/home/Home.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
