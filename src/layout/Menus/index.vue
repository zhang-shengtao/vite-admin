<template>
  <el-scrollbar :style="style" class="Menus">
    <el-menu
      :default-active="$route.path"
      :class="[layoutType === 'top' && isPc ? 'bottom' : 'left']"
      text-color="#fff"
      :="$attrs"
      :collapse="collapse"
    >
      <menu-item v-for="item in menuArr" :key="item.path" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup name="menus">
import { userPinia } from "@/pinia";
import MenuItem from "./MenuItem.vue";
const { isCollapse, isPc, layoutType, menuArr } = storeToRefs(userPinia());

const collapse = computed(() => {
  let collapse = isCollapse.value;
  if (layoutType.value == "top" || !isPc.value) {
    collapse = false;
  }
  return collapse;
});
defineProps(["style"]);
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  border: none;
}

.Menus {
  left: 0;
  z-index: 2;
  transition: all 0.5s;
  background-color: var(--el-menu-bg-color);
  --el-bg-color-overlay: #035165;

  :deep(.el-menu-item.is-active::after) {
    content: "";
    width: 2px;
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    background-color: var(--el-menu-active-color);
    border-radius: 50%;
  }

  .left {
    :deep(.el-menu-item.is-active::after) {
      top: 0;
    }
  }

  .bottom {
    :deep(.el-menu-item.is-active::after) {
      width: 100%;
      height: 2px;
      bottom: 0px;
    }
  }
}
</style>
