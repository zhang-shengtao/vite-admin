<template>
  <el-table-column :="tableColumnProp($attrs)">
    <template v-if="typeOf(children) === 'array' && children.length">
      <table-column v-for="(item, i) in children" :key="i" :="item" :slots="slots" />
    </template>
    <template
      v-if="typeOf(children) === 'undefined' && isShowDefaultSlot(slot, $attrs.type || $attrs.label)"
      #default="{ row, column, $index }"
    >
      <component v-if="!!slot" :is="slots[slot]" :="{ row, column, $index }" />
      <template v-else>{{ rowKey(prop, row, column, $index, formatter) }}</template>
    </template>
    <template v-if="!!header" #header="scope">
      <component :is="slots[header]" :="scope" />
    </template>
  </el-table-column>
</template>

<script setup>
import { typeOf } from "@/utils/method.js";
import { watch } from "vue";
const props = defineProps({
  children: {
    type: Array
  },
  header: {
    type: [String],
    default: ""
  },
  slots: {
    type: Object,
    default: {}
  },
  prop: {
    type: [String, Function],
    default: ""
  },
  formatter: {
    type: Function
  },
  slot: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    default: "center"
  }
});

function tableColumnProp(attrs) {
  const obj = { ...attrs };
  if (typeOf(props.prop) === "string") obj.prop = props.prop;
  obj.align = props.align;
  return obj;
}

function rowKey(key, row, column, $index, formatter) {
  if (typeOf(formatter) === "function") return formatter({ row, column, $index });
  if (typeOf(key) === "function") return key({ row, column, $index });
  const keys = key.split(".");
  let value = "";
  keys.forEach((item) => {
    if (item.endsWith("]")) {
      const arr = item.split("[");
      const i = arr[1].split("]")[0];
      value = value ? value[arr[0]][i] : row[arr[0]][i];
    } else {
      value = value ? value[item] : row[item];
    }
  });
  return value;
}

function isShowDefaultSlot(slotName, type) {
  let bol = true;
  bol = !(["selection", "index", "expand", "编辑", "操作"].includes(type) && !slotName);
  return bol;
}
</script>

<style lang="scss" scoped></style>
