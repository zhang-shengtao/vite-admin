const hidden = true;
const KeepAlive = true;

/**
 * 静态路由所有角色打开都能看到的路由
 * @param {Boolean} hidden 为true表示不显示在菜单中
 * @param {Boolean} KeepAlive 为true表示缓存该组件
 * @module []
 */
export default [
  {
    path: "/login",
    meta: { titel: "登录" },
    hidden,
    name: "login",
    component: () => import("@/view/auth/login.vue")
  },
  {
    path: "/404",
    alias: "/:pathMatch(.*)*",
    meta: { titel: "404" },
    hidden,
    component: () => import("@/view/auth/404.vue")
  },
  {
    path: "/abouts",
    meta: { titel: "测试" },
    hidden,
    name: "abouts",
    component: () => import("@/view/about/index.vue")
  }
];
