

// 主线程发送消息过来
onmessage = function(e) {
   console.log(e.data);
    postMessage('向主线程发送消息');
  }