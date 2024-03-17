<template>
  <div class="scrollbar column-center">
    <el-space class="column-center">
      <Icon :name="isCollapse ? 'Expand' : 'Fold'" @click="isCollapse = !isCollapse" />
      <el-breadcrumb separator="/">
        <template v-for="item in $route.matched" :key="item.path">
          <el-breadcrumb-item v-if="item.path != '/'">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-space>
    <el-space class="right column-center" :size="15">
      <DropdownMenu MagicStick />
      <el-autocomplete
        v-model.trim="searchMenus"
        clearable
        :fetch-suggestions="querySearch"
        placeholder="请输入页面名称"
        @select="handleSelect"
        v-if="isPc"
      />
      <DropdownMenu />
    </el-space>
  </div>
</template>

<script setup>
import { userPinia } from "@/pinia";
const { isCollapse, searchMenu, isPc } = storeToRefs(userPinia());
import DropdownMenu from "./DropdownMenu.vue";
const searchMenus = ref("");
const router = useRouter();

function querySearch(searchName, callback) {
  if (searchName) {
    callback(searchMenu.value.filter((item) => item?.value.includes(searchName)));
  } else {
    callback([]);
  }
}
function handleSelect({ path }) {
  searchMenus.value = "";
  if (path.startsWith("http")) {
    window.open(path);
  } else {
    router.push({ path });
  }
}
</script>

<style lang="scss" scoped>
.scrollbar {
  width: 100%;
  height: 100%;
}

.right {
  float: right;
}
</style>
