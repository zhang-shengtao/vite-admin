import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
import { userPinia } from "@/pinia";

const whiteList = ["/login", "/404"]; // 路由白名单

export default function (router) {
  router.beforeEach(async (to, from, next) => {
    const userPinias = await userPinia();
    NProgress.start();
    document.title = to.meta?.title;
    if (userPinias.token) {
      if (to.path === "/login") {
        next("/");
        NProgress.done();
      } else {
        if (userPinias.userInfo.username) {
          next();
          NProgress.done();
        } else {
          try {
            await userPinias.getUserInfo(); // 用户信息
            next({ ...to, replace: true });
          } catch (err) {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
