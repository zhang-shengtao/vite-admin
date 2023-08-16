<template>
  <div class="tag column-center">
    <Icon class="tag_icon" name="ArrowLeftBold" @click="scroll('left')" />
    <el-scrollbar ref="scrollbar" style="flex: 1" @scroll="(v) => (scrollLeft = v.scrollLeft)">
      <el-space ref="space">
        <el-button
          size="small"
          @click="$router.push({ path: item.path })"
          @contextmenu.prevent="openMenu($event)"
          :type="item.path === $route.path ? 'primary' : ''"
          v-for="item in tag"
          :key="item.path"
          class="tag_btn"
        >
          {{ item.name }}
          <Icon class="CircleCloseFilled" @click.stop="delTag(item)" :size="15" color="red" name="CircleCloseFilled" />
        </el-button>
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
  //   console.log(val);
  // 右键删除待做
}
function delTag(item) {
  if (item.path === route.path) return ElMessage("不能删除当前所在的页面");
  const i = tag.findIndex((i) => i.path == item.path);
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
  .tag_btn:hover .CircleCloseFilled {
    color: red;
    opacity: 0.8;
    display: block;
  }

  .CircleCloseFilled {
    padding-left: 5px;
    display: none;
  }

  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 4px;
  }
}
</style>
