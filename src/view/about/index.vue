<template>
  <div>
    <el-button type="primary" @click="fileUpload">上传文件</el-button>
  </div>
</template>

<script setup>
import { sliceFile } from "@/utils/method.js";

function fileUpload() {
  const input = document.createElement("input");
  input.type = "file";
  input.click();
  const files = [];
  input.onchange = async function () {
    console.time("切片时间");
    for (let item of input.files) {
      files.push(item);
    }
    const fileBolb = await sliceFile(files[0]);
    console.log(fileBolb);
    console.timeEnd("切片时间");
  };
}
</script>

<style scoped lang="scss"></style>
