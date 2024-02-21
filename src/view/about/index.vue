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
  // input.accept = ".zip";
  // input.multiple = true;
  input.click();
  const files = [];
  input.onchange = function () {
    for (let item of input.files) {
      files.push(item);
    }
    sliceFile(files[0]);
  };
}
</script>

<style scoped lang="scss"></style>
