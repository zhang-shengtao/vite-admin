<template>
  <div v-for="item in menu" class="menuItem">
    {{ item.label }}
  </div>
</template>

<script setup>
import { winWH } from "@/utils/winEven.js";
const props = defineProps({
  menu: {
    type: Array,
    default: []
  },
  fn: {
    type: Function
  }
});

/***
 *x,y =>鼠标位置  vw,vh =>视口的大小 w,h =>要显示菜单的宽高
 * if(x.val>vw.val-w.val) return x.val-w.val
 * if(y.val>vh.val-h.val) return vh.val-h.val
 *
 */
</script>

<style lang="scss" scope>
.rightmens {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  min-width: 60px;
  max-width: 280px;
  border-radius: 10px;
  background-color: rgb(219, 115, 63);
  .menuItem {
    color: #fff;
  }
}
</style>
