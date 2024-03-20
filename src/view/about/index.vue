<template>
  <el-card class="box-card">
    <el-button v-file="fileUpload">指令传参更新</el-button>
  </el-card>
</template>

<script setup>
import { sliceFile } from "@/utils/method.js";

async function fileUpload(files) {
  console.time("切片时间");
  const fileBolb = await sliceFile(files[0]);
  console.log(fileBolb);
  console.timeEnd("切片时间");
}

const menu = reactive([
  {
    label: "测试1",
    value: 1
  },
  {
    label: "测试2",
    value: 2
  },
  {
    label: "测试3",
    value: 3
  }
]);
</script>

<style scoped lang="scss">
.contextmenu {
  background-color: aliceblue;
  min-width: 100px;
  max-width: 280px;
}
</style>
