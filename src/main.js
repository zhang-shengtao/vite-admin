import { createApp as _createApp } from "vue";
import createRouter from "./router";
import createPinia from "./pinia";
import App from "./view/app.vue";
import components from "./components";
import directive from "./directive";
import ElementPlus from "element-plus"; // 如果不走cdn要注释掉,配置的有自动按需引入

function createApp() {
  const app = _createApp(App);
  const router = createRouter(app);
  const pinia = createPinia(app);
  app.use(directive);
  app.use(ElementPlus); // 如果不走cdn要注释掉,配置的有自动按需引入
  app.use(router);
  app.use(pinia);
  app.use(components);
  router.isReady().then(() => {
    app.mount("#app");
  });
  return { app, router, pinia };
}

createApp();
