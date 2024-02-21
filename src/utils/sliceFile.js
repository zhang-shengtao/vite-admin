import SparkMD5 from "spark-md5";
const spark = new SparkMD5.ArrayBuffer();

// 主线程发送消息过来
self.onmessage = function (e) {
  console.log(e.data);
  self.postMessage("向主线程发送消息");
};

function fn() {
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
}
