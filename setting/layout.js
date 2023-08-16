import { getStorage } from "@/utils/storage";
import storageKey from "./storageKey";

/**
 * 整个项目的布局信息
 * @param {String} layoutType left（左右布局 -> 广）| top（上下布局 -> 二）| top-right（上下右布局 -> 厂）
 * @param {String} theme normal(默认) dark（黑暗）
 * @param {Boolean} isTag 是否显示标签栏
 */
const layout = {
  layoutType: getStorage(storageKey.layoutType) || "left",
  theme: getStorage(storageKey.theme) || "normal",
  isTag: getStorage(storageKey.isTag) === "true" || true
};

export default layout;
