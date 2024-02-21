// 主线程发送消息过来
self.onmessage = function (e) {
  console.log(e.data);
  self.postMessage("向主线程发送消息");
};
