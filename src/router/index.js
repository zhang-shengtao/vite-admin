import { createRouter as _createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import config from "#/setting/config";
import statics from "./static";
import modules from "./modules";
// import middleware from "./permission";

const routes = [...statics];
if (!config.trendsRouter) {
  routes.push(...modules);
}
export const allRouter = routes;

export function createRouter() {
  const Router = _createRouter({
    history: createWebHistory(),
    routes,
    strict: true
  });
  // middleware(Router);
  return Router;
}

export default createRouter;
