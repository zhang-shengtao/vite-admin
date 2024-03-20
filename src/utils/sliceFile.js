import SparkMD5 from "spark-md5";

// 主线程发送消息过来
addEventListener("message", async (e) => {
  const { file, size, start, end, sliceFileTotal } = e.data;
  const promiseAll = [];
  let startSize = 0;
  let endSize = 0;
  for (let index = start; index < end; index++) {
    startSize = index * size;
    const endSizeNext = startSize + size;
    endSize = endSizeNext >= file.size ? file.size : endSizeNext;
    promiseAll.push(promiseFileSlice(file, startSize, endSize, sliceFileTotal, index, size));
  }
  Promise.all(promiseAll).then(self.postMessage);
});

function promiseFileSlice(file, start, end, total, i, fragmentationSize) {
  return new Promise((reslove) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end, file.type);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      reslove({
        blob,
        startByte: start, // 从那个字节开始
        endByte: end, // 从那个字节结束
        fragmentationTotal: total, // 切片总数
        fragmentationIndex: i, // 当前切片的下标
        fragmentationSize, // 每片切片的大小
        hash: spark.end(), // 给当前切片添加一个唯一hash
        lastModified: file.lastModified, // 原始文件的最后一次修改时间
        name: file.name, // 原始文件的名字
        totalSize: file.size // 原始文件的大小
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
