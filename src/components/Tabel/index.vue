<template>
  <el-table :="$attrs" ref="elTableRef">
    <table-column v-for="(item, i) in columns" :key="i" :="item" :slots="$slots" />
    <template v-for="item in tableSlot($slots)" #[item]="scope">
      <slot :name="item" :="{ ...scope }" />
    </template>
  </el-table>
</template>

<script setup>
import TableColumn from "./TableColumn.vue";
const props = defineProps({
  columns: {
    type: Array,
    require: true,
    default: []
  }
});

function tableSlot(s) {
  let arr = [];
  if (s.append) arr.push("append");
  if (s.empty) arr.push("empty");
  return arr;
}

const elTableRef = ref();

defineExpose({
  elTable: elTableRef
});
</script>

<style lang="scss" scoped></style>
