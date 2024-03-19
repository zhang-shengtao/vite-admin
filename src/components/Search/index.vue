<template>
  <el-card>
    <el-space wrap size="large">
      <component v-for="(item, name) in com" :is="name" v-model="data[item.key]" :="handleProps(item)"> </component>
    </el-space>
  </el-card>
</template>

<script setup>
import Icon from "../Icon/index.vue";
const icon = (name) => defineComponent(() => () => h(Icon, { name }));

const toCom = ["prefix-icon", "suffix-icon"]; // elementPlus提供的内部组件props需要转换为函数
const slotName = ["elOptionGroup", "elOption"]; // elementPlus提供的内部组件名称渲染时直接用
const delKey = ["key", "slot", "data", "slotName"]; // 需要删除的key

const data = reactive({
  val1: "",
  val2: "",
  val3: "",
  val4: "",
  val5: "",
  val6: ""
});

const com = {
  elInput: {
    key: "val1",
    placeholder: "请输入val1的值"
  },
  elSelect: {
    key: "val2",
    placeholder: "请选择val2的值",
    slot: [
      {
        slotName: "default",
        com: "elOptionGroup",
        data: [
          {
            lable: "第一组",
            options: [
              {
                value: "1-1",
                label: "第一组1"
              },
              {
                value: "1-2",
                label: "第一组2"
              }
            ]
          },
          {
            lable: "第二组",
            options: [
              {
                value: "2-1",
                label: "第二组1"
              },
              {
                value: "2-2",
                label: "第二组2"
              }
            ]
          }
        ]
      }
    ]
  }
};

function handleProps(prop) {
  const obj = { ...prop };
  let keys = Object.keys(obj);
  keys.forEach((item) => {
    if (toCom.includes(item)) obj[item] = obj[item](icon);
    if (delKey.includes(item)) delete obj[item];
  });
  return obj;
}
</script>

<style scoped lang="scss">
:deep(.el-input) {
  --el-input-width: 200px;
}

:deep(.el-select) {
  --el-select-width: 200px;
}
</style>
