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
        startByte: start,
        endByte: end,
        fragmentationTotal: total,
        fragmentationIndex: i,
        fragmentationSize,
        hash: spark.end(),
        lastModified: file.lastModified,
        name: file.name,
        totalSize: file.size
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
