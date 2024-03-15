<template>
  <el-card class="box-card"> 3级路由 </el-card>
</template>

<script setup>
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
});

const formDom = [
  {
    label: "Activity name",
    next() {}
  }
];

function onSubmit() {}
</script>

<style lang="scss" scoped></style>
