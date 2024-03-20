<template>
  <div>
    <el-table :="$attrs" ref="elTableRef">
      <table-column v-for="(item, i) in columns" :key="i" :="item" :slots="tableSlot($slots, false)" />
      <template v-for="(val, key) in tableSlot($slots)" #[key]="scope">
        <component :is="val" :="scope" />
      </template>
    </el-table>
    <div style="padding-top: 15px">
      <el-dropdown placement="top">
        <el-button type="primary" text>批量操作</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>批量删除</el-dropdown-item>
            <el-dropdown-item> 批量编辑 </el-dropdown-item>
            <el-dropdown-item>批量审核</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-pagination
        style="float: right"
        v-if="total"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @change="(page, limit) => emit('handlePagination', { page, limit })"
      />
    </div>
  </div>
</template>

<script setup>
import TableColumn from "./TableColumn.vue";
const props = defineProps({
  columns: {
    type: Array,
    require: true,
    default: []
  },
  total: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(["handlePagination"]);

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

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
