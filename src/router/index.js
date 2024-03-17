import { createRouter as _createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import config from "#/setting/config";
import statics from "./static";
import modulesRouter from "./modules";
import middleware from "./permission";

const routes = [...statics];
if (!config.isAddRouter) {
  routes.push(...modulesRouter);
}

let router;
function createRouter() {
  if (router) return router;
  router = _createRouter({
    history: createWebHistory(),
    routes,
    strict: true
  });
  // middleware(router);
  return router;
}

export { modulesRouter, routes };
export default createRouter;
