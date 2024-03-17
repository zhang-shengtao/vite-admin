import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
import { userPinia } from "@/pinia";

// 这路由拦截器需要根据项目实际情况进行更改
const whiteList = ["/login", "/404"]; // 路由白名单

export default function (router) {
  router.beforeEach(async (to, from, next) => {
    const userPinias = await userPinia();
    NProgress.start();
    if (to.meta && to.meta.title) document.title = to.meta.title;
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
            console.log("错误信息", err);
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      if (whiteList.includes(to.path)) return next();
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
