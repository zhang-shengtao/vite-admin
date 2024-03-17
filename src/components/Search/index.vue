<template>
  <el-card>
    <el-space wrap size="large">
      <component v-for="item in com" :is="item.component" :="item.props" v-model="data[item.key]">
        <template v-for="slot in item.slot" :key="name" #[slot.name]> </template>
      </component>
    </el-space>
  </el-card>
</template>

<script setup>
defineProps({
  searchData: {
    type: Object,
    require: true,
    default: {}
  },
  components: {
    type: Array,
    require: true,
    default: []
  }
});

const input = ref("");
const value = ref("");

const data = reactive({
  val1: "",
  val2: "",
  val3: ""
});

const com = [
  {
    component: "elInput",
    key: "val1",
    props: {
      placeholder: "请输入value1"
    }
  },
  {
    component: "elSelect",
    key: "val2",
    props: {
      placeholder: "请输入value2"
    },
    slot: [
      {
        name: "default",
        component: "elOption"
      }
    ],
    data: [
      {
        label: "选择项1",
        value: 1
      },
      {
        label: "选择项2",
        value: 2
      }
    ]
  },
  {
    component: "elInput",
    key: "val3",
    props: {
      placeholder: "请输入value3",
      clearable: true
    }
  },
  {
    component: "elButton",
    props: {
      onClick: testClick
    },
    slot: [
      {
        name: "default"
      }
    ]
  }
];

function testClick() {
  console.log("测试的点击事件");
}

const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];
</script>

<style scoped lang="scss">
:deep(.el-input) {
  --el-input-width: 200px;
}

:deep(.el-select) {
  --el-select-width: 200px;
}
</style>
