<template>
  <el-table :="$attrs" ref="elTableRef">
    <table-column v-for="(item, i) in columns" :key="i" :="item" :slots="tableSlot($slots, false)" />
    <template v-for="(val, key) in tableSlot($slots)" #[key]="scope">
      <component :is="val" :="scope" />
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

function tableSlot(s, isTabel = true) {
  let obj = {};
  if (isTabel) {
    if (s.append) obj.append = s.append;
    if (s.empty) obj.empty = s.empty;
  } else {
    for (let key in s) {
      if (!["append", "empty"].includes(key)) obj[key] = s[key];
    }
  }
  return obj;
}

const elTableRef = ref();

defineExpose({
  elTable: elTableRef
});
</script>

<style lang="scss" scoped></style>
