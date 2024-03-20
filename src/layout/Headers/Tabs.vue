<template>
  <div class="tag column-center">
    <Icon class="tag_icon" name="ArrowLeftBold" @click="scroll('left')" />
    <el-scrollbar ref="scrollbar" style="flex: 1" @scroll="(v) => (scrollLeft = v.scrollLeft)">
      <el-space ref="space">
        <el-tag
          @contextmenu.prevent="openMenu($event)"
          @click="$router.push({ path: item.path })"
          @mouseenter="item.closable = true"
          @mouseleave="item.closable = false"
          :closable="!!item.closable"
          @close="delTag(i)"
          disable-transitions
          style="cursor: pointer"
          :effect="item.path === $route.path ? 'dark' : 'light'"
          v-for="(item, i) in tag"
          :key="item.path"
          >{{ item.name }}</el-tag
        >
      </el-space>
    </el-scrollbar>
    <Icon class="tag_icon" name="ArrowRightBold" @click="scroll('right')" />
  </div>
</template>
<script setup name="Tabs">
const route = useRoute();
const tag = reactive([]);
const scrollLeft = ref(0); // 滚动条当前所在的位置
const scrollbar = ref(null); // 滚动窗口的宽度
const space = ref(null); // 可滚动的区域
const seep = 60; // 步移的距离

function scroll(v) {
  scrollbar.value.update();
  let offsetWidth = space.value.$el.offsetWidth - scrollbar.value.wrapRef.offsetWidth;
  if (v == "left" && scrollLeft.value <= 0) return scrollbar.value.setScrollLeft(seep);
  if (v == "right" && scrollLeft.value >= offsetWidth) return scrollbar.value.setScrollLeft(scrollLeft.value - seep);
  if (v == "left" && scrollLeft.value < offsetWidth) scrollbar.value.setScrollLeft((scrollLeft.value += seep));
  if (v == "right" && scrollLeft.value > 0) scrollbar.value.setScrollLeft((scrollLeft.value -= seep));
  scrollbar.value.update();
}

function openMenu(val) {
  console.log(val);
  // 右键删除待做
}
function delTag(i) {
  const item = tag[i];
  if (item.path === route.path) return ElMessage("正在浏览当前页面不能删除");
  tag.splice(i, 1);
}

watch(
  route,
  (val) => {
    if (!tag.some((item) => item.path == val.path) && !val.meta.hidden && val.meta?.title) {
      tag.push({
        path: val.path,
        name: val.meta.title,
        query: val.query
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.tag {
  height: 30px;
  box-shadow: var(--box-shadow-color);
  background-color: var(--el-bg-color);
  .tag_icon {
    padding: 0 10px;
  }
  :deep(.el-scrollbar__view) {
    display: flex;
    align-items: center;
    height: 100%;
  }

  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 4px;
  }
}
</style>
