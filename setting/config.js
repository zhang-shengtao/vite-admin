/**
 * @param {Boolean} host 是否监听本地IP
 * @param {Boolean} open 是否自动打开浏览器
 * @param {Boolean} isAddRouter 是否开启动态路由 (动态路由需要前后端协调来实现)
 * @param {Boolean} baseUrl 请求后台能接口的基础路径
 * @param {Boolean} key 缓存本地信息的前缀
 * @param {Boolean} visualizerOpen 打包后的分析图是否自动打开
 */
const config = {
  host: true,
  open: false,
  isAddRouter: false,
  baseUrl: "http:127.0.0.1",
  key: "USER",
  visualizerOpen: true
};

export default config;
