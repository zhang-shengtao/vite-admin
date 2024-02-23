<template>
  <div>
    <!-- <el-button type="primary" @click="fileUpload">上传文件</el-button> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column label="Address">
        <template #default>
          <el-image
            preview-teleported
            style="width: 100px; height: 100px"
            :preview-src-list="[url]"
            :src="url"
          ></el-image>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { sliceFile } from "@/utils/method.js";
const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";

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

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>

<style scoped lang="scss"></style>
