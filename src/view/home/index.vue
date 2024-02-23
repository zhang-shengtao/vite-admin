<template>
  <div>
    <el-card class="box-card">
      <MyTabel stripe border height="500" :data="tableData" ref="MyTabels" :columns="tabelHeaders">
        <template #input="scope">
          <!-- <el-input v-model="text" placeholder="请输入"></el-input> -->
          <component is="ElInput" :="obj" />
        </template>
        <template #edit="{ row, column, $index }">
          <el-tag>Tag{{ $index }}</el-tag>
        </template>
      </MyTabel>
      <el-button style="margin-top: 10px" @click="clearSelection">clearSelection</el-button>
    </el-card>
  </div>
</template>

<script setup name="home">
import { debounceRef } from "@/utils/method";
const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const tableData = [
  {
    date: "2022/10/11",
    name: "测试的",
    age: 11,
    state: "California",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2023/12/23",
    name: "合并的",
    age: 12,
    state: "California",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2022/10/11",
    name: "测试的",
    age: 11,
    state: "California",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2023/12/23",
    name: "合并的",
    age: 12,
    state: "California",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  },
  {
    date: "2024/01/22",
    name: "哈哈哈哈",
    age: 13,
    address: "No. 189, Grove St, Los Angeles",
    state: "California",
    zip: "CA 90036"
  }
];
const text = ref("");
watch(text, (val) => {
  console.log(val);
});

const obj = ref({
  placeholder: "请输入",
  "model-value": text
});

const tabelHeaders = [
  {
    type: "selection",
    width: "120",
    fixed: true
  },
  {
    label: "时间",
    prop: "date",
    width: "300"
  },
  {
    label: "整体",
    align: "left",
    children: [
      {
        label: "姓名",
        prop: "name",
        width: "300"
      },
      {
        label: "地址信息",
        children: [
          {
            label: "年龄",
            prop: "age",
            width: "300",
            "column-key": "age",
            filters: [
              { text: "11岁", value: 11 },
              { text: "12岁", value: 12 },
              { text: "13岁", value: 13 }
            ],
            "filter-method": (value, row) => row.age === value
          },
          {
            label: "地址",
            prop: "address",
            width: "300"
          },
          {
            label: "state1111",
            prop: "state",
            width: "300",
            header: {
              com: "ElImage",
              src: url,
              "preview-src-list": [url],
              "preview-teleported": true,
              style: {
                width: "30px",
                height: "30px"
              }
            }
          },
          {
            label: "zpiyayya",
            prop: "zip",
            width: "300",
            header: "input"
          }
        ]
      }
    ]
  },
  {
    label: "编辑",
    fixed: "right",
    slot: "edit",
    width: "100"
  }
];

// const tabelHeaders = [
//   {
//     type: "selection",
//     width: "120",
//     fixed: true
//   },
//   {
//     label: "时间",
//     prop: "date",
//     width: "300"
//   },
//   {
//     label: "姓名",
//     prop: "name",
//     width: "300"
//   },
//   {
//     label: "年龄",
//     prop: "age",
//     width: "300",
//     "column-key": "age",
//     filters: [
//       { text: "11岁", value: 11 },
//       { text: "12岁", value: 12 },
//       { text: "13岁", value: 13 }
//     ],
//     "filter-method": (value, row) => row.age === value
//   },
//   {
//     label: "地址",
//     prop: "address",
//     width: "300"
//   },
//   {
//     label: "state1111",
//     prop: "state",
//     width: "300",
//     header: {
//       com: "ElImage",
//       src: url,
//       "preview-src-list": [url],
//       "preview-teleported": true,
//       style: {
//         width: "30px",
//         height: "30px"
//       }
//     }
//   },
//   {
//     label: "zpiyayya",
//     prop: "zip",
//     width: "300"
//   },
//   {
//     label: "编辑",
//     fixed: "right",
//     slot: "edit",
//     width: "100"
//   }
// ];

const MyTabels = ref(null);
function clearSelection() {
  // MyTabels.value.elTable.clearSelection();
}
onMounted(() => {});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
