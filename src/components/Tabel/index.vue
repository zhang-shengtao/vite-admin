<template>
  <el-table :="$attrs">
    <template v-for="(item, index) in tabelHeader" :key="index">
      <el-table-column :="tableColumnAttrs(item)" v-if="Object.keys(item).length">
        <template #header="{ column, $index }" v-if="item.type === 'header'">
          <slot :name="item.slot" :="{ column, $index }" />
        </template>
        <template #="{ row, column, $index }" v-if="!['index', 'selection', 'expand'].includes(item.type)">
          <slot :name="item.slot" v-if="!item.type?.includes('header') && item.slot" :="{ row, column, $index }" />
          <el-image
            v-else-if="item.type == 'image'"
            style="width: 50px; height: 50px"
            :src="isFn(item.prop) ? item.prop({ row, column, $index, index }) : row[item.prop]"
            :zoom-rate="1.2"
            :preview-src-list="[isFn(item.prop) ? item.prop({ row, column, $index, index }) : row[item.prop]]"
            :initial-index="4"
            fit="cover"
          />
          <span v-else>{{ isFn(item.prop) ? item.prop({ row, column, $index }) : rowVal(row, item.prop) }}</span>
        </template>
        <template #="{ row, column, $index }" v-else-if="item.type === 'selection'">
          <slot :name="item.slot" v-if="item.slot" :="{ row, column, $index }" />
        </template>
        <template #="{ row, column, $index }" v-else-if="item.type === 'expand'">
          <slot name="expand" v-if="item.slot" :="{ row, column, $index }" />
        </template>
      </el-table-column>
    </template>
    <slot />
    <template #append><slot name="append" /></template>
    <template #empty><slot name="empty" /></template>
  </el-table>
</template>

<script setup name="Tables">
import { typeOf } from "@/utils/method";
defineProps({
  tabelHeader: {
    type: Array,
    require: true,
    default: []
  }
});

function isFn(is_Fn) {
  return typeOf(is_Fn) === "function";
}
function tableColumnAttrs(row) {
  const item = { ...row, align: row.align || "center" };
  if (isFn(item.prop)) delete item.prop;
  return item;
}

function rowVal(row, prop) {
  const valArr = prop.split(".");
  let val = "";
  let i = 0;
  while (i < valArr.length) {
    val = row[valArr[i]];
    ++i;
  }
  return val;
}
</script>

<style lang="scss" scoped></style>
