import { typeOf, IsPC, file } from "@/utils/method";

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
export function isScroll(el, binding) {
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
