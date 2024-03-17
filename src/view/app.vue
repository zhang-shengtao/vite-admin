<template>
  <el-config-provider :locale="zhCn" :message="{ max: 2 }">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// console.log(ElMessage);
</script>

<style lang="scss">
// @use "element-plus/dist/index.css"; // 走cdn的话就注释
@use "element-plus/theme-chalk/dark/css-vars.css";
@use "element-plus/theme-chalk/display.css";
@use "@/style/themeDefaut.scss";
@use "@/style/themeDark.scss";
</style>
