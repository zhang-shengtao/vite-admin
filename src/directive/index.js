import { files, isScroll } from "./method";
import { rightmens } from "./rightmens/index.js";

// 批量注册自定义指令
export default function (app, option) {
  app.directive("file", files);
  app.directive("scroll", isScroll);
  app.directive("rightmens", rightmens);
}
