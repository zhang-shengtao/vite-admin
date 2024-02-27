import { createApp as _createApp } from "vue";
import createRouter from "./router";
import createPinia from "./pinia";
import App from "./view/app.vue";
import components from "./components";
import directive from "./directive";
import ElementPlus from "element-plus";

function createApp() {
  const app = _createApp(App);
  const router = createRouter(app);
  const pinia = createPinia(app);
  app.use(directive);
  app.use(ElementPlus);
  app.use(router);
  app.use(pinia);
  app.use(components);
  router.isReady().then(() => {
    app.mount("#app");
  });
  return { app, router, pinia };
}

createApp();

