import { defineStore } from "pinia";
import layout from "#/setting/layout";
import config from "#/setting/config";
import storageKey from "#/setting/storageKey";
import { winWH } from "@/utils/winEven.js";
import createRouter, { routes, modulesRouter } from "@/router";
import { setStorage, getStorage } from "@/utils/storage";
import { userInfo, routerInfo } from "@/api/user";

const layoutType = layout.layoutType;
if (!getStorage(storageKey.layoutType)) setStorage(storageKey.layoutType, layoutType);
let isPc = () => !/Mobi|Android|iPhone/i.test(navigator.userAgent);

// 格式化路径
function resolve(val1, val2) {
  if (val1.startsWith("http")) return val1;
  if (val1 && !val1.startsWith("/")) val1 = "/" + val1;
  if (val2 && !val2.startsWith("/")) val2 = "/" + val2;
  return val2 + val1;
}
// 处理要显示在菜单栏中的列表
function menuArr(allArr, path = "") {
  const arr = [];
  const KeepAlive = [];
  allArr.forEach((page) => {
    const item = { ...page };
    if (item.path != "/") item.path = resolve(item.path, path);
    if (item.children && item.children.length && item.path != "/") {
      item.children = menuArr(item.children, item.path).arr;
    }
    if (!item.hidden) item.path === "/" ? arr.push(...menuArr(item.children).arr) : arr.push(item);
    if (item.KeepAlive && item.name) KeepAlive.push(item.name);
  });
  return { arr, KeepAlive };
}
// 处理要搜索的菜单栏
function searchMenu(allArr, name = "") {
  let arr = [];
  allArr.forEach((item) => {
    let value = name ? name + ">" + item.meta?.title : item.meta.title;
    if (item.children && item.children.length) {
      arr = arr.concat(searchMenu(item.children, value));
    } else {
      arr.push({ path: item.path, value });
    }
  });
  return arr;
}
// 需要处理的动态路由
function concat(menu = [], modulesRouters = []) {
  const arr = [];
  console.group("合并动态路由");
  console.table(menu);
  console.table(modulesRouters);
  console.log("需要自行处理从后端请求回来的动态路由数据与本地路由数据进行合并的逻辑");
  console.groupEnd("合并动态路由");
  return arr;
}

export default defineStore("user", () => {
  const data = reactive({
    userInfo: {}, // 用户信息
    isCollapse: false,
    isPc: isPc(),
    winWidth: document.body.clientWidth,
    menuArr: [], // 所有的菜单页面
    KeepAlive: [], // 要缓存的页面
    searchMenu: [] // 要搜索的页面一维数组
  });
  const layoutData = reactive({ ...layout });

  function router(arr) {
    const { arr: menuAll, KeepAlive } = menuArr(arr || routes);
    data.KeepAlive = KeepAlive;
    data.menuArr = menuAll;
    data.searchMenu = searchMenu(menuAll);
  }
  // 不需要动态路直拿全部路由
  if (!config.isAddRouter) router();

  function getUserInfo() {
    return new Promise((resolve, rejected) => {
      userInfo()
        .then(async (res) => {
          data.userInfo = res.data;
          if (config.isAddRouter) await getRouterInfo();
          resolve(res);
        })
        .catch(rejected);
    });
  }
  function getRouterInfo() {
    return routerInfo().then((res) => {
      const arr = concat(res.data || [], modulesRouter);
      arr.forEach((item) => createRouter().addRoute(item));
      router(arr);
    });
  }

  watch(
    [layoutData, winWH],
    (newVal, val) => {
      const [layoutDatas, winWHs] = newVal;
      document.documentElement.className = layoutDatas.theme;
      setStorage(storageKey.theme, layoutDatas.theme);
      setStorage(storageKey.isTag, layoutDatas.isTag);
      if (layoutDatas.layoutType === val[1]?.layoutType) {
        setStorage(storageKey.layoutType, layoutDatas.layoutType);
      }
      data.isPc = isPc();
      if (!isPc()) data.isCollapse = false;
      if (winWHs.vw <= 750) {
        data.isPc = false;
      } else {
        data.isPc = true;
      }
      if (winWHs.vw > 750 && winWHs.vw < 1200) {
        layoutData.layoutType = "top";
      }
      if (winWHs.vw >= 1200) {
        layoutData.layoutType = layoutType;
      }
      data.winWidth = winWHs.vw;
    },
    { immediate: true }
  );

  return { ...toRefs(layoutData), ...toRefs(data), getUserInfo };
});
