import { typeOf, IsPC, file } from "@/utils/method";
import RightMens from "./componentes/RightMens.vue";
import { winWH } from "@/utils/winEven.js";
// v-file:[order1].xls.multiple="testV"
export function files(el, binding) {
  if (typeOf(binding.value) !== "function") {
    return console.error(new Error("请绑定回调函数"));
  }
  el.style.cursor = "pointer";
  el.onclick = () => {
    const multiple = binding.modifiers.multiple;
    let accept = "image/*";
    if (binding.modifiers.img && binding.arg != "*") {
      accept = ".png,.jpg,.jpeg,.svg,.webp,.image";
    }
    if (binding.modifiers.xls && binding.arg != "*") {
      accept = ".xls,.xlsx,.doc,.docx";
    }
    if (binding.arg) {
      accept = binding.arg;
    }
    file({ multiple, accept }).then(binding.value);
  };
}

// 滚动行为 v-scroll.y="scroll"
export function isScroll(el, binding, vnode, prevNode) {
  el.style.userSelect = "none";
  let { x: scrollX, y: scrollY } = binding.modifiers;
  if (!scrollX && !scrollY) {
    scrollY = true;
  }
  if (scrollX && scrollY) {
    scrollY = true;
    scrollX = false;
  }
  const ol = el.firstElementChild;
  const ispc = IsPC(); //true为PC端,false为手机端
  const typeEventdown = ispc ? "mousedown" : "touchstart"; // 鼠标按下
  const typeEventmove = ispc ? "mousemove" : "touchmove"; // 鼠标滑动
  const typeEvenup = ispc ? "mouseup" : "touchend"; // 鼠标抬起
  let parentDomWH = "";
  let childrenDomWH = "";
  let isDown = false;
  let cur = 0; // 列表滑动位置
  let fl = 150; //弹力公式:位置*=弹力/(弹 力+位置)
  let vy = 0;
  let isInTransition = false; // 是否在滚动中
  const offset = 50;
  // 鼠标按下
  // el.addEventListener(typeEventdown, Eventdown); // 不能用DOM二级事件,会重复绑定
  el[`on${typeEventdown}`] = Eventdown;
  function Eventdown(e) {
    if (isInTransition) return; //如果在滚动中，则中止执行
    if (this._timer) clearInterval(this._timer); //清除定时器
    vy = 0;
    let event = e;
    if (!ispc) {
      event = e.touches[0];
      event.timeStamp = e.timeStamp;
      e.preventDefault();
    }
    if (scrollX) {
      parentDomWH = el.clientWidth;
      childrenDomWH = el.scrollWidth;
      this._start = event.clientX;
      this._gap = event.clientX - cur;
    }
    if (scrollY) {
      parentDomWH = el.clientHeight;
      childrenDomWH = el.scrollHeight;
      this._start = event.clientY;
      this._gap = event.clientY - cur;
    }
    this._timeStamp = e.timeStamp;
    isDown = true;
    // 鼠标移动
    el.addEventListener(typeEventmove, Eventmove, false);
    // 鼠标抬起
    el.addEventListener(typeEvenup, mouseover, false);
    // 鼠标离开当前元素
    if (ispc) el.addEventListener("mouseleave", mouseover, false);
  }
  // 鼠标移动
  function Eventmove(e) {
    if (isDown) {
      let event = e;
      if (!ispc) {
        e.preventDefault();
        event = e.touches[0];
        event.timeStamp = e.timeStamp;
      }
      if (event.timeStamp - this._timeStamp > 40) {
        this._timeStamp = event.timeStamp;
        if (scrollX) cur = event.clientX - this._gap;
        if (scrollY) cur = event.clientY - this._gap;
        if (cur > 0) {
          cur *= fl / (fl + cur);
        } else if (cur < parentDomWH - childrenDomWH) {
          cur += childrenDomWH - parentDomWH;
          cur = (cur * fl) / (fl - cur) - childrenDomWH + parentDomWH;
        }
        setPos(cur);
      }
      if (scrollX) {
        vy = event.clientX - this._start;
        this._start = event.clientX;
      }
      if (scrollY) {
        vy = event.clientY - this._start;
        this._start = event.clientY;
      }
    }
  }
  // 改变位置
  function setPos(val) {
    if (scrollY) {
      ol.style.transform = `translate(0px,${val}px)`;
    }
    if (scrollX) {
      ol.style.transform = `translate(${val}px,0px)`;
    }
  }
  // 鼠标移动
  function mouseover(e) {
    if (isDown) {
      isDown = false;
      if (ispc) {
        e.preventDefault();
        el.removeEventListener("mouseleave", mouseover);
      }
      el.removeEventListener(typeEventmove, Eventmove);
      el.removeEventListener(typeEvenup, mouseover);

      let friction = ((vy >> 31) * 2 + 1) * 0.5; //根据力度套用公式计算出惯性大小
      let oh = childrenDomWH - parentDomWH;
      this._timer = setInterval(() => {
        vy -= friction;
        cur += vy;
        setPos(cur);
        if (-cur - oh > offset) {
          clearInterval(this._timer);
          ease(-oh);
          // 下拉触底 -1
          if (typeOf(binding.value) === "function") binding.value(scrollY ? "bottom" : "left");
          return;
        }
        if (cur > offset) {
          //如果列表顶部超出了
          clearInterval(this._timer);
          ease(0); //回弹
          // 上拉触顶 1
          if (typeOf(binding.value) === "function") binding.value(scrollY ? "top" : "right");
          return;
        }
        // 快速滑动时触发
        if (Math.abs(vy) < 1) {
          // 如果力度减小到小于1了,再做超出回弹
          clearInterval(this._timer);
          if (cur > 0) {
            ease(0);
            // 上拉触顶 1
            if (typeOf(binding.value) === "function") binding.value(scrollY ? "top" : "right");
            return;
          }
          if (-cur > oh) {
            ease(-oh);
            // 下拉触底 -1
            if (typeOf(binding.value) === "function") binding.value(scrollY ? "bottom" : "left");
            return;
          }
        }
      }, 20);
    }
  }
  // 快速滑动时回弹
  function ease(target) {
    isInTransition = true;
    el.timer = setInterval(() => {
      cur -= (cur - target) * 0.2;
      if (Math.abs(cur - target) < 1) {
        //减到 当前位置 与 目标位置相差小于1 之后直接归位
        cur = target;
        clearInterval(el.timer);
        isInTransition = false;
      }
      setPos(cur);
    }, 20);
  }
}

let div;
// v-rightclickmens:[data]=fn @contextmenu="contextmenu"
export const rightmens = {
  // 在绑定元素的 attribute 前或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {},
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {
    if (!Array.isArray(binding.arg)) return console.error(new Error("请绑定菜单数据"));

    const DOM = reactive({
      w: 0,
      h: 0
    });
    const ob = new ResizeObserver((enties) => {
      const { blockSize, inlineSize } = enties[0].borderBoxSize[0];
      DOM.w = inlineSize;
      DOM.h = blockSize;
      console.log("1", blockSize, inlineSize);
    });
    if (div) ob.observe(div);

    el.oncontextmenu = (e) => {
      e.preventDefault();
      if (div) {
        div.remove();
        div = null;
      }
      div = document.createElement("div");
      div.className = "rightmens";
      const { clientX, clientY } = e;
      const app = createApp(RightMens, { menu: binding.arg });
      watch(
        computed(() => {
          let top = clientY;
          let left = clientX;
          if (clientX > winWH.vw - DOM.w) left = clientX - DOM.w;
          if (clientY > winWH.vh - DOM.h) top = winWH.vh - DOM.h;
          return {
            top: top + "px",
            left: left + "px"
          };
        }),
        (val) => {
          div.style.top = val.top;
          div.style.left = val.left;
          console.log("4", val);
        }
      );
      app.mount(div);
      ob.observe(div);
      console.log("3", div);
      document.body.append(div);
    };
  },
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
};
