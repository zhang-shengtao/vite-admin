<template>
  <div class="Headers">
    <el-header style="width: 100%; padding: 0 15px">
      <TopHeader v-if="isTopHeader" />
      <div class="column-center" v-else style="width: 100%">
        <Menus mode="horizontal" style="width: calc(100% - 60px)" />
        <DropdownMenu />
      </div>
    </el-header>
    <Tabs v-if="isTag" />
  </div>
</template>

<script setup name="headers">
import { userPinia } from "@/pinia";
import Menus from "../Menus/index.vue";
import TopHeader from "./topHeader.vue";
import DropdownMenu from "./DropdownMenu.vue";
import Tabs from "./Tabs.vue";
const { isTag } = storeToRefs(userPinia());
defineProps(["isTopHeader"]);
</script>

<style lang="scss" scoped>
.Headers {
  position: absolute;
  top: 0px;
  right: 0px;
  transition: all 0.5s;
}
</style>
