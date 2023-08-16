import Clipboard from "clipboard";

/**
 * 判断类型
 * @param value 要判断的值
 * @returns String
 */
export function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}

/**
 * @param {String|Array} txts  要复制的文字
 * @param {String|Array} txts  要复制的图片
 * @returns Promise
 */
export function coyp({ txts, imgs }, id) {
  return new Promise((resolve, reject) => {
    let child = "";
    let div = document.createElement("div");
    div.setAttribute("style", "z-index: -10;position: fixed;left:-10px");
    if (txts) {
      if (typeOf(txts) === "string") {
        child += `<span>${txts}</span>`;
      }
      if (typeOf(txts) === "array") {
        txts.forEach((item) => {
          child += `<span>${item}</span>`;
        });
      }
    }
    if (imgs) {
      if (typeOf(imgs) === "string") {
        imgs = imgs.includes("https") ? imgs.replace("https", "http") : imgs;
        child += `<img src="${imgs}" />`;
      }
      if (typeOf(imgs) === "array") {
        imgs.forEach((item) => {
          item = item.includes("https") ? item.replace("https", "http") : item;
          child += `<img src="${item}" />`;
        });
      }
    }
    if (child === "") {
      div = null;
      return reject("");
    }
    div.innerHTML = child;
    document.body.appendChild(div);
    const clipboard = new Clipboard(id, {
      target: () => div
    });
    clipboard.on("success", (e) => {
      e.clearSelection();
      div.parentNode.removeChild(div);
      resolve(e);
    });
    clipboard.on("error", (e) => {
      reject(e);
    });
  });
}

/**
 * 判断是PC端还是手机端
 * @returns true为PC端false为手机端
 */
export function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flagPc = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flagPc = false;
      break;
    }
  }
  return flagPc;
}

/**
 * js上传文件
 * @param multiple  是否多选 {Boolean}
 * @param accept  文件后缀名限制 {String}
 * @returns Promise
 */
export function file({ multiple = false, accept = "image/*" } = { multiple: false, accept: "image/*" }) {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    let flieList = [];
    input.type = "file";
    if (multiple) input.multiple = "multiple";
    input.accept = accept;
    input.click();
    input.addEventListener("change", files);
    function files() {
      const flies = input.files;
      Object.keys(flies).forEach((item) => {
        flieList.push(flies[item]);
      });
      resolve(flieList);
      input.removeEventListener("change", files);
      input = null;
      flieList = null;
    }
  });
}
