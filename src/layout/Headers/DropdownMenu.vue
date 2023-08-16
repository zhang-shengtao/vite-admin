<template>
  <el-dropdown>
    <Icon v-if="MagicStick" name="MagicStick" />
    <img v-else src="/test.png" class="dropdown" alt="图片" />
    <template #dropdown>
      <el-dropdown-menu>
        <template v-if="MagicStick">
          <el-dropdown-item @click="userPinias.theme = 'normal'" :disabled="userPinias.theme == 'normal'"
            >默认
          </el-dropdown-item>
          <el-dropdown-item @click="userPinias.theme = 'dark'" :disabled="userPinias.theme == 'dark'"
            >暗黑
          </el-dropdown-item>
        </template>
        <template v-else>
          <el-dropdown-item @click="FullScreen">
            <Icon name="FullScreen" />{{ isScreenFull ? "恢复原样" : "全屏" }}
          </el-dropdown-item>
          <el-dropdown-item @click="$router.go(0)"> <Icon name="Refresh" />刷新 </el-dropdown-item>
          <el-dropdown-item @click="logout"> <Icon name="SwitchButton" />退出登录 </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup name="DropdownMenu">
import { userPinia } from "@/pinia";
const userPinias = userPinia();
import screenfull from "screenfull";
defineProps({
  MagicStick: {
    type: Boolean,
    default: false
  }
});
const isScreenFull = ref(false);
function FullScreen() {
  const dom = document.querySelector("html");
  screenfull.isEnabled ? screenfull.toggle(dom) : ElMessage.warning("您的浏览器无法工作");
}
screenfull.on("change", (val) => {
  isScreenFull.value = !isScreenFull.value;
});
const router = useRouter();
function logout() {
  console.log("点击退出了");
  router.replace("/login");
}
</script>
<style lang="scss" scoped>
.dropdown {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: block;
  cursor: pointer;
}
</style>
