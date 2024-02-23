<template>
  <el-table-column :="$attrs" :align="align">
    <template v-if="children && children.length">
      <table-column v-for="(item, i) in children" :key="i" :="item" :slots="slots" />
    </template>
    <template v-if="!children && isShowDefaultSlot(slot, $attrs.type || undefined)" #default="{ row, column, $index }">
      <component v-if="slot" :is="slots[slot]" :="{ row, column, $index }" />
      <span v-else>{{ row[prop] }} -> {{ $index }}</span>
    </template>
    <template v-if="headerSlot(header)" #header="scope">
      <component :is="slots[header]" :="{ ...scope }" v-if="typeOf(header) === 'string'" />
      <component :is="header.com" :="{ ...header }" v-else />
    </template>
  </el-table-column>
</template>

<script setup>
import { typeOf } from "@/utils/method.js";
const props = defineProps({
  children: {
    type: Array
  },
  header: {
    type: [String, Object],
    default: {}
  },
  slots: {
    type: Object,
    default: {}
  },
  prop: {
    type: [String, Function],
    default: () => ""
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

function headerSlot(arg) {
  let bol = false;
  bol = (typeof arg === "string" && !!arg) || (typeOf(arg) === "object" && JSON.stringify(arg) != "{}");
  return bol;
}

function isShowDefaultSlot(slotName, type) {
  let edit = ["编辑", "操作"];
  let bol = true;
  bol = !(["selection", "index"].includes(type) && !slotName);
  return bol;
}
</script>

<style lang="scss" scoped></style>
