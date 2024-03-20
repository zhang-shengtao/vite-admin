import { files, isScroll } from "./method";

// 批量注册自定义指令
export default function (app, option) {
  app.directive("file", files);
  app.directive("scroll", isScroll);
}
