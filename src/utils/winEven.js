import { debounce } from "lodash-es";

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

function onMousedown(e) {}
function copy(e) {
  e.preventDefault();
  e.clipboardData.setData("text/plain", "不给复制打钱");
}

window.onresize = debounce(onResize, 300);
window.onmousedown = debounce(onMousedown, 100);
window.addEventListener("copy", copy);
