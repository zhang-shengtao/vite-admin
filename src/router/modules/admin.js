const layout = () => import("@/layout/index.vue");
const hidden = true;
const KeepAlive = true;
/**
 * 动态路由
 * @param {Boolean} meta.hidden 为true表示不显示在菜单中
 * @module []
 */
export default [
  {
    path: "/",
    meta: {},
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        meta: { title: "首页", icon: "HomeFilled" },
        name: "home",
        component: () => import("@/view/home/index.vue")
      },
      {
        path: "about",
        meta: { title: "关于", KeepAlive, icon: "HomeFilled" },
        name: "about",
        component: () => import("@/view/about/index.vue")
      },
      {
        path: "emoji",
        meta: { title: "emoji", KeepAlive, icon: "HomeFilled" },
        name: "emoji",
        component: () => import("@/view/emoji/index.vue")
      },
      {
        path: "from",
        meta: { title: "表单封装", KeepAlive, icon: "Filter" },
        name: "from",
        component: () => import("@/view/from/index.vue")
      }
    ]
  }
];
