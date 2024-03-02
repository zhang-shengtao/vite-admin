<template>
  <Headers :style="HeaderStyle" :isTopHeader="isTopHeader" />
  <Menus v-if="isTopHeader" :style="MenusStyle" />
  <MainApp :style="MainAppStyle" />
  <div class="model" @click="isCollapse = !isCollapse" v-if="!isPc && isCollapse"></div>
</template>

<script setup name="Layout">
import { userPinia } from "@/pinia";
import Headers from "./Headers/index.vue";
import Menus from "./Menus/index.vue";
import MainApp from "./MainApp/index.vue";
import useResize from "./hooks/useResize";
const { layoutType, isCollapse, isPc } = storeToRefs(userPinia());
const { HeaderStyle, MenusStyle, MainAppStyle } = useResize();
const isTopHeader = computed(() => {
  let isTopHeaders = layoutType.value != "top";
  if (isPc.value === false) isTopHeaders = true;
  return isTopHeaders;
});
</script>

<style lang="scss" scoped>
.model {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: #141414db;
}
</style>
