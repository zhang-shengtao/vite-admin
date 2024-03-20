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
 * n-m的随机整数
 * @param n 最小值
 * @param m 最大值
 * @returns String
 */
export function random(n, m) {
  return Math.floor(Math.random() * (m - n) + n);
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
 * @param {Boolean} multiple  是否多选 {Boolean}
 * @param {String} accept  文件后缀名限制 {String}
 * @returns {Promise}
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

/**
 * 文件切片
 * @param { File | Array[File] } file   是否多选 { File | Array[File] }
 * @param {Number} point 断点续传的分片位置
 * @returns {Array} Array[Object]
 */
export function sliceFile(file, point = 0) {
  return new Promise((resolve) => {
    let fileList = [];
    const size = 1024 * 1024 * 10; // 每片大小10M
    const sliceFileTotal = Math.ceil(file.size / size); // 总共要切多少片
    let cupNum = navigator.hardwareConcurrency; // 需要开启得线程(cup核心数)
    if (sliceFileTotal < cupNum) cupNum = sliceFileTotal;
    let remainder = sliceFileTotal % cupNum; // 多出来得分片数量
    const fragmentation = (sliceFileTotal - remainder) / cupNum; // 每一个线程需要分几片
    let start = 0;
    let end = 0;
    const promiseAll = [];
    for (let index = 0; index < cupNum; index++) {
      const p = new Promise((res) => {
        const myWorker = new Worker(new URL("./sliceFile.js", import.meta.url), { type: "module" });
        end = start + fragmentation + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
        myWorker.postMessage({
          file,
          size,
          start,
          end,
          sliceFileTotal
        });
        myWorker.onmessage = function (e) {
          res(e.data);
          myWorker.terminate();
        };
        start = end;
      });
      promiseAll.push(p);
    }
    Promise.all(promiseAll).then((res) => {
      res.forEach((arr) => {
        if (fileList.length) {
          const i = fileList[fileList.length - 1].fragmentationIndex;
          const index = arr[0].fragmentationIndex;
          if (i < index) {
            fileList = fileList.concat(arr);
          } else {
            fileList = arr.concat(fileList);
          }
        } else {
          fileList = fileList.concat(arr);
        }
      });
      resolve(fileList);
    });
  });
}
