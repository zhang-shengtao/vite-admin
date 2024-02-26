import { defineStore } from "pinia";
import layout from "#/setting/layout";
import config from "#/setting/config";
import storageKey from "#/setting/storageKey";
import { winWH } from "@/utils/winEven.js";
import { allRouter } from "@/router";
import { setStorage } from "@/utils/storage";

const layoutType = layout.layoutType;
let isPc = () => !/Mobi|Android|iPhone/i.test(navigator.userAgent);

export default defineStore("user", () => {
  const data = reactive({
    isCollapse: false,
    isPc: isPc(),
    winWidth: document.body.clientWidth,
    menuArr: [], // 所有的菜单页面
    KeepAlive: [], // 要缓存的页面
    searchPage: [] // 要搜索的页面一维数组
  });
  const layoutData = reactive({ ...layout });

  // 处理要显示在菜单栏中的列表
  function menuArr(allArr, path = "") {
    let arr = [];
    allArr.forEach((item) => {
      item = { ...item };
      if (!item.meta.hidden) {
        if (item.children && item.children.length >= 1) {
          let children = menuArr(item.children, item.path.startsWith("http") ? "" : item.path);
          if (item.path != "/") {
            item.children = children;
            if (children.length == 1) item = children[0];
            arr.push(item);
          } else {
            arr.push(...children);
          }
        } else {
          if (!item.path.startsWith("/") && !item.path.startsWith("http") && path) {
            item.path = (path == "/" ? "" : path) + `/${item.path}`;
            arr.push(item);
          }
        }
      }
      if (item.name && item.meta.KeepAlive && !data.KeepAlive.includes(item.name)) {
        data.KeepAlive.push(item.name);
      }
    });
    return arr;
  }
  // 处理要搜索的菜单栏
  function searchPage(allArr, name = "") {
    let arr = [];
    allArr.forEach((item) => {
      let value = name ? name + ">" + item.meta.title : item.meta.title;
      if (!item.children?.length) {
        arr.push({ path: item.path, value });
      } else {
        const rr = searchPage(item.children, value);
        arr = arr.concat(rr);
      }
    });
    return arr;
  }
  // 不需要动态路直拿全部路由
  if (!config.trednsRouter) {
    data.menuArr = menuArr(allRouter);
    data.searchPage = searchPage(data.menuArr);
  }

  watch(
    layoutData,
    (val) => {
      document.documentElement.className = val.theme;
      setStorage(storageKey.theme, val.theme);
      setStorage(storageKey.layoutType, val.layoutType);
      setStorage(storageKey.isTag, val.isTag);
    },
    { immediate: true }
  );
  watch(
    winWH,
    (val) => {
      data.isPc = isPc();
      if (!isPc()) data.isCollapse = false;
      if (val.vw <= 750) {
        data.isPc = false;
      } else {
        data.isPc = true;
      }
      if (val.vw == data.winWidth) return;
      if (val.vw > 750 && val.vw < 1200) {
        layoutData.layoutType = "top";
      }
      if (val.vw >= 1200) {
        layoutData.layoutType = layoutType;
      }
      data.winWidth = val.vw;
    },
    { immediate: true }
  );

  return { ...toRefs(layoutData), ...toRefs(data) };
});
