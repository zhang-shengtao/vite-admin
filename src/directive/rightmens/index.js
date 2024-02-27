import RightMens from "./RightMens.vue";
import { winWH } from "@/utils/winEven.js";

let div = null;
const DOM = reactive({
  w: 0,
  h: 0
});
const ob = new ResizeObserver((enties) => {
  const { blockSize, inlineSize } = enties[0].borderBoxSize[0];
  DOM.w = inlineSize;
  DOM.h = blockSize;
});
let unwatch = null;
// v-rightclickmens:[data]=fn @contextmenu="contextmenu"
export const rightmens = {
  position(e, binding) {
    const { clientX, clientY } = e;
    const app = createApp(RightMens, { menu: binding.arg, fn: binding.value });
    unwatch = watch(
      [winWH, DOM],
      (val) => {
        const [winWH, DOM] = val;
        let top = clientY;
        let left = clientX;
        if (clientX > winWH.vw - DOM.w) left = clientX - DOM.w;
        if (clientY > winWH.vh - DOM.h) top = winWH.vh - DOM.h;
        div.style.top = top + "px";
        div.style.left = left + "px";
      },
      { immediate: true }
    );
    app.mount(div);
    document.body.append(div);
  },
  // 在绑定元素的 attribute 前或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {},
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {
    if (!Array.isArray(binding.arg)) return console.error(new Error("请绑定菜单数据"));
    el.oncontextmenu = (e) => {
      if (div) clearDiv();
      e.preventDefault();
      if (!div) div = document.createElement("div");
      div.className = "rightmens";
      if (div) ob.observe(div);
      rightmens.position(e, binding);
    };
  },
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {
    clearDiv();
  },
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
};

export function clearDiv(e) {
  if (e?.button == 2) return;
  ob.disconnect();
  div && div.remove();
  div = null;
  unwatch && unwatch();
  unwatch = null;
}
