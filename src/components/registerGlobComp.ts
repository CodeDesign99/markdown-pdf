import type { App } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
const modules = import.meta.globEager('./**/*.vue');

async function registerComponents(app) {
  // 遍历所有 .vue 文件并注册组件
  for (const path in modules) {
    // const name = path.split('/').pop().slice(0, -4); // 获取文件名，去除 .vue 后缀
    const component = modules[path].default; // 获取组件
    const name = component.name
    app.component(name, component); // 注册组件
  }
}

export function registerGlobComp(app: App) {
  app.use(Antd);
  registerComponents(app)
}
