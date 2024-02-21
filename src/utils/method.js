import Clipboard from "clipboard";
import SparkMD5 from "spark-md5";
import myWorkerjs from "./sliceFile.js?raw";

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

export function debounceRef(value = "", t = 1000) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(val) {
        trigger();
        value = val;
      }
    };
  });
}

/**
 * 文件切割
 * @param { File | Array[File] } file   是否多选 { File | Array[File] }
 * @returns {Array} Array
 */
export function sliceFile(file) {
  console.time("分片耗时");
  // if(!Array.isArray(file)) file = [file]
  const spark = new SparkMD5.ArrayBuffer();
  const fileList = [];
  const size = 1024 * 1024 * 5; // 每片大小2M
  const sliceFileTotal = Math.ceil(file.size / size); // 总共要切多少片
  const cupNum = navigator.hardwareConcurrency; // cup核心数

  const myWorker = new Worker(window.URL.createObjectURL(new Blob([myWorkerjs], { type: "application/javascript" })));
  myWorker.postMessage("主线程得消息");
  myWorker.onmessage = function (e) {
    console.log(e.data);
    myWorker.terminate();
  };

  let start = 0;
  let end = 0;
  for (let i = 0; i < sliceFileTotal; i++) {
    start = i * size;
    end = (i + 1) * size >= file.size ? file.size : (i + 1) * size;
    const fileReader = new FileReader();
    const blob = file.slice(start, end, file.type);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      fileList.push({
        blob,
        start,
        end,
        index: i,
        hash: spark.end()
      });
      if (i + 1 >= sliceFileTotal) console.log(fileList);
    };
    fileReader.readAsArrayBuffer(blob);
  }
  // console.log(file);
  console.timeEnd("分片耗时");
}
