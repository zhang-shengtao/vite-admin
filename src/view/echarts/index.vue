<template>
  <div class="echarts">
    <el-card class="box_card">
      <template #header>
        <span>3D饼状图</span>
      </template>
      <div ref="pieDom" class="pie"></div>
    </el-card>
    <el-card class="box_card">
      <template #header>
        <span>3D柱状图</span>
      </template>
      <div ref="barDom" class="bar"></div>
    </el-card>
    <el-card class="box_card">
      <template #header>
        <span>柱状图</span>
      </template>
      <div class="bar"></div>
    </el-card>
  </div>
</template>
<script setup name="echarts">
import { pie, bar3D } from "./echart.js";
const { $echarts } = getCurrentInstance().proxy;
const pieDom = ref(null);
const barDom = ref(null);
const Data = [
  {
    name: "占比5",
    value: 62
  },
  {
    name: "占比4",
    value: 18
  },
  {
    name: "占比3",
    value: 10
  },
  {
    name: "占比1",
    value: 3
  },
  {
    name: "占比2",
    value: 7
  }
];

onMounted(() => {
  const myPie = $echarts.init(pieDom.value);
  const myBar = $echarts.init(barDom.value);
  pie(Data, myPie);
  bar3D(Data, myBar);
});
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .box_card {
    width: 30%;
    margin-right: 10px;
  }
  .pie,
  .bar {
    width: 100%;
    height: 300px;
  }
  ::v-deep(.el-card__body) {
    padding: 0;
  }
}
</style>
