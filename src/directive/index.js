import { files, isScroll } from "./method";

// 批量注册自定义指令
export default function (app, option) {
  console.log(option, "注册指令的配置项");
  app.directive("file", files);
  app.directive("scroll", isScroll);
}
