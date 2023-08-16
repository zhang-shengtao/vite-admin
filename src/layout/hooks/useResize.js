import { userPinia } from "@/pinia";

export default function useResize() {
  const { isCollapse, isPc, winWidth, layoutType, isTag } = storeToRefs(userPinia());

  const headerH = computed(() => {
    let w = "60px";
    if (isTag.value) w = "90px";
    return w;
  }); // 头部的高度
  const menuW = "200px"; // 菜单栏的宽度
  const menuWs = "64px"; // 收起menu后的宽度
  const width = computed(() => {
    return isCollapse.value ? `calc(100% - ${menuWs})` : `calc(100% - ${menuW})`;
  }); // 头部和内容主体的宽度

  const HeaderStyle = reactive({ width: width.value });
  const MenusStyle = reactive({
    position: "absolute",
    height: "100%",
    width: "200px",
    top: "0px"
  });
  const MainAppStyle = reactive({ width: width.value, height: `calc(100% - ${headerH.value})`, top: headerH.value });

  watch(
    [winWidth, layoutType, isCollapse, isTag],
    ([winWidth, layoutType, isCollapse, isTag]) => {
      if (!isPc.value) {
        HeaderStyle.width = "100%";
        MainAppStyle.width = "100%";
        MenusStyle.left = isCollapse ? "0px" : `-${menuW}`;
        MenusStyle.height = winWidth <= 750 ? "100%" : `calc(100% - ${headerH.value})`;
        MenusStyle.top = winWidth <= 750 ? "0" : headerH.value;
        delete HeaderStyle.background;
        return;
      }
      if (layoutType === "top") {
        HeaderStyle.width = "100%";
        HeaderStyle.height = headerH.value;
        MainAppStyle.width = "100%";
        HeaderStyle.background = "var(--el-menu-bg-color)";
      }
      if (layoutType == "top-right") {
        HeaderStyle.width = "100%";
        MainAppStyle.width = width.value;
        MenusStyle.height = `calc(100% - ${headerH.value})`;
        MenusStyle.top = headerH.value;
        MenusStyle.width = isCollapse ? menuWs : menuW;
        MenusStyle.left = "0px";
        delete HeaderStyle.background;
      }
      if (layoutType == "left") {
        HeaderStyle.width = width.value;
        MainAppStyle.width = width.value;
        MenusStyle.height = "100%";
        MenusStyle.top = 0;
        MenusStyle.width = isCollapse ? menuWs : menuW;
        MenusStyle.left = "0px";
        delete HeaderStyle.background;
      }
    },
    { immediate: true }
  );

  return { HeaderStyle, MenusStyle, MainAppStyle };
}
