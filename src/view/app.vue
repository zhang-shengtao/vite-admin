<template>
  <el-config-provider :locale="zhCn" :message="{ max: 2 }">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// console.log($msgbox);
</script>

<style lang="scss">
// @use "element-plus/dist/index.css"; // 走cdn的话就注释
@use "element-plus/theme-chalk/dark/css-vars.css";
@use "@/style/themeDefaut.scss";
@use "@/style/themeDark.scss";
</style>
