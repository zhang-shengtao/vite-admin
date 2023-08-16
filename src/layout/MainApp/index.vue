<template>
  <el-main class="MainApp">
    <el-scrollbar style="padding: 15px; box-sizing: border-box" ref="scrollbarRef">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="KeepAlive" :max="10">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup name="minapp">
import { userPinia } from "@/pinia";
const { KeepAlive } = storeToRefs(userPinia());
const scrollbarRef = ref(null);
const main_height = ref("auto");

function mainHeight() {
  main_height.value = scrollbarRef.value.$el.clientHeight - 30 + "px";
}

onMounted(() => {
  mainHeight();
  window.addEventListener("resize", mainHeight);
});

onBeforeMount(() => {
  window.removeEventListener("resize", mainHeight);
});
</script>

<style lang="scss" scoped>
.MainApp {
  position: absolute;
  right: 0;
  transition: all 0.5s;
  background-color: var(--mian-app-bg);
  padding: 0;
  overflow: hidden;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
