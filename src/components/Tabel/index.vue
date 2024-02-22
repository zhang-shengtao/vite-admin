<template>
  <el-table :="$attrs" ref="elTableRef">
    <template v-for="(item, i) in columns" :key="i">
      <el-table-column :="tableColumnProps(item)"> </el-table-column>
    </template>
    <template v-for="item in tableSlot($slots)" #[item]>
      <slot :name="item"></slot>
    </template>
  </el-table>
</template>

<script setup>
defineProps({
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
// 计算el-table-column绑定的属性
function tableColumnProps(props) {
  const row = unref(props);
  const prop = row.prop;
  return row;
}

const elTableRef = ref();

defineExpose({
  elTable: elTableRef
});
</script>

<style lang="scss" scoped></style>
