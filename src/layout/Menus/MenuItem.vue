<template>
  <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
    <template #title>
      <Icon v-if="item.meta.icon" :name="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <menu-item v-for="items in item.children" :key="items.path" :item="items" />
  </el-sub-menu>

  <AppLink v-else :path="item.path">
    <el-menu-item :index="item.path">
      <Icon v-if="item.meta.icon" :name="item.meta.icon" />
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </AppLink>
</template>

<script setup name="MenuItem">
import AppLink from "./AppLink.vue";
defineProps(["item"]);
</script>

<style lang="scss" scoped></style>
