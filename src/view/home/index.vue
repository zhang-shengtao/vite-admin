<template>
  <div>
    <el-card class="box-card">
      <MyTabel
        :data="tableData"
        ref="MyTabels"
        border
        :default-sort="{ prop: 'date', order: 'descending' }"
        :columns="tabelHeaders"
      >
        <template #empty>
          <div>这里是空的ya</div>
        </template>
      </MyTabel>

      <el-button @click="clearSelection">clearSelection</el-button>
    </el-card>
  </div>
</template>

<script setup name="home">
import { debounceRef } from "@/utils/method";
const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const tableData = [
  {
    date: "12",
    name: "asdfad"
  },
  {
    date: "13",
    name: "asdfad1231"
  },
  {
    date: "14",
    name: "21231adaD"
  }
];

const tabelHeaders = [
  {
    type: "selection",
    width: "55"
  },
  {
    label: "时间",
    prop: "date"
  },
  {
    label: "姓名",
    prop: "name"
  },
  {
    label: "地址",
    prop: "name"
  }
];

const MyTabels = ref(null);
function clearSelection() {
  MyTabels.value.clearSelection();
}
onMounted(() => {
  console.log(MyTabels.value);
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
