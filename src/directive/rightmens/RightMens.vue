<template>
  <div v-for="item in menu" class="menuItem" @click="fn(item)">
    {{ item.label }}
  </div>
</template>

<script setup>
const props = defineProps({
  menu: {
    type: Array,
    default: []
  },
  fn: {
    type: Function,
    default: () => {}
  }
});
</script>

<style lang="scss" scope>
.rightmens {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  min-width: 80px;
  max-width: 280px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.575);
  overflow: hidden;
  cursor: pointer;
  padding: 5px 0;
  .menuItem {
    color: #fff;
    text-align: center;
    padding: 4px;
    box-sizing: border-box;
  }
  .menuItem:hover {
    background-color: rgba(0, 0, 0, 0.63);
  }
}
</style>
