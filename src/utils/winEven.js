import { debounce } from "lodash-es";
import { clearDiv } from "@/directive/rightmens/index.js";
export const Mymap = new WeakMap();

export const winWH = reactive({
  vw: document.documentElement.clientWidth,
  vh: document.documentElement.clientHeight
});

// 监听窗口的变化
function onResize() {
  winWH.vw = document.documentElement.clientWidth;
  winWH.vh = document.documentElement.clientHeight;
}

function onMousedown(e) {
  clearDiv(e);
}
window.onresize = debounce(onResize, 300);
window.onmousedown = debounce(onMousedown, 100);
