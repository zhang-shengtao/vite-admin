const layout = () => import("@/layout/index.vue");
const hidden = true;
const KeepAlive = true;
const target = true;
/**
 * 动态路由
 * @param {Boolean} hidden 为true表示不显示在菜单中
 * @param {Boolean} KeepAlive 为true表示缓存该组件
 * @module []
 */
export default [
  {
    path: "/",
    component: layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        meta: { title: "首页", icon: "HomeFilled" },
        props: { test: "这里是测试的数据路由传参" },
        name: "home",
        component: () => import("@/view/home/index.vue")
      },
      {
        path: "about",
        meta: { title: "关于", icon: "HomeFilled" },
        name: "about",
        target,
        component: () => import("@/view/about/index.vue")
      },
      {
        path: "emoji",
        meta: { title: "emoji", icon: "HomeFilled" },
        name: "emoji",
        component: () => import("@/view/emoji/index.vue")
      }
    ]
  }
];
