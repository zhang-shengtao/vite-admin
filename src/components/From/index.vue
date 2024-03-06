<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({});
</script>

<style lang="scss" scoped></style>
