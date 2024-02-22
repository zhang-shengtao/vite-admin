<template>
  <el-table :="$attrs" ref="elTableRef">
    <template v-for="(item, i) in columns" :key="i">
      <el-table-column v-bind="item"></el-table-column>
    </template>
    <template v-for="(_, name) in $slots" :key="name" #[name]="scopedData">
      <slot :name="name" :="scopedData" />
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      require: true,
      default: []
    }
  },
  mounted() {
    const elTableRef = this.$refs.elTableRef;
    for (const key in elTableRef) {
      this[key] = elTableRef[key];
    }
  }
};
</script>

<style lang="scss" scoped></style>
