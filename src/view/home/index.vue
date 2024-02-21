<template>
  <div>
    <el-card class="box-card">
      <Tabels :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" :tabelHeader="tabelHeader">
        <template #input="{ column }">
          <el-input v-model="n" placeholder="这是第11个位置"></el-input>
        </template>
        <template #input1="{ column }">
          <el-input v-model="n" placeholder="这是第二个位置"></el-input>
        </template>
        <template #empty>
          <div>这里是空白内容</div>
        </template>
      </Tabels>
    </el-card>
    {{ n }}
  </div>
</template>

<script setup name="home">
import { debounceRef } from "@/utils/method";
const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: { name: "No. 189, Grove St, Los Angeles" },
    url
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: { name: "No. 189, Grove St, Los Angeles" },
    url
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: { name: "No. 189, Grove St, Los Angeles" },
    url
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: { name: "No. 189, Grove St, Los Angeles" },
    url
  }
];
const n = debounceRef("", 500);

const tabelHeaders = [
  {
    label: "时间",
    prop: "date"
  },
  {
    label: "姓名",
    prop: ({ row, $index, index }) => $index + row.name + index
  },
  {
    label: "地址",
    prop: "address.name",
    type: "header",
    slot: "input"
  }
];

const tabelHeader = [
  {
    label: "序号",
    type: "index",
    index: (i) => i * 2,
    width: 60
  },
  {
    label: "时间",
    prop: "date",
    type: "header",
    slot: "input1"
    // sortable: true
  },
  {
    label: "姓名",
    prop: ({ row, $index, index }) => $index + row.name + index
  },
  {
    label: "地址",
    prop: "address.name",
    type: "header",
    slot: "input"
  },
  {
    label: "图片",
    prop: "url",
    type: "image"
  }
];
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
