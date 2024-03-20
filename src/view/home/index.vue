<template>
  <div>
    <el-card class="box-card">
      <el-button style="margin-top: 10px" @click="clearSelection">clearSelection</el-button>
      <MyTable
        stripe
        border
        show-summary
        :data="tableData"
        :total="30"
        :ref="(news) => (MyTabels = news?.elTable)"
        @handlePagination="handlePagination"
        :columns="tabelHeaders"
      >
        <template #input="{ column, $index }">
          <el-input v-model="text" placeholder="请输入zip"></el-input>
        </template>
        <template #edit="{ row, column, $index }">
          <el-tag>Tag{{ $index }}</el-tag>
        </template>
        <template #image="{ row, column, $index }">
          <el-image
            preview-teleported
            style="width: 30px; height: 30px"
            :src="row.url"
            :preview-src-list="[url]"
          ></el-image>
        </template>
        <template #expand="{ row, column, $index }">
          <div>展开行内容{{ row.state }}</div>
        </template>
        <template #empty>
          <div>空的数据</div>
        </template>
      </MyTable>
    </el-card>
  </div>
</template>

<script setup name="home">
const props = defineProps(["test"]); // 通过路由传参
console.log(props);

const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const tableData = [
  {
    date: "2016-05-03",
    name: "测试的",
    age: 11,
    url,
    state: "10",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-02",
    name: "哈哈哈哈",
    age: 13,
    url,
    address: "No. 189, Grove St, Los Angeles",
    state: "5",
    zip: "CA 90036"
  },
  {
    date: "2016-05-04",
    name: "哈哈哈哈",
    age: 12,
    url,
    address: "No. 189, Grove St, Los Angeles",
    state: "7",
    zip: "CA 90036"
  },
  {
    date: "2016-05-01",
    name: "哈哈哈哈",
    age: 9,
    url,
    address: "No. 189, Grove St, Los Angeles",
    state: "2",
    zip: "CA 90036"
  }
];

const text = ref("");

const tabelHeaders = [
  {
    type: "selection",
    width: "120",
    fixed: true
  },
  {
    label: "时间",
    prop: "date",
    sortable: true,
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
            prop: ({ row }) => row.age,
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
            width: "300"
          },
          {
            label: "图片",
            prop: "url",
            width: "300",
            slot: "image"
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
//     sortable: true,
//     width: "300"
//   },
//   {
//     label: "姓名",
//     prop: "name",
//     width: "300"
//   },
//   {
//     label: "state1111",
//     prop: "state",
//     width: "300",
//     sortable: true
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
//     label: "zpiyayya",
//     prop: "zip",
//     header: "input",
//     width: "300"
//   },
//   {
//     label: "图片",
//     prop: "url",
//     width: "300",
//     slot: "image"
//   },
//   {
//     label: "编辑",
//     fixed: "right",
//     slot: "edit",
//     width: "100"
//   },
//   {
//     type: "expand",
//     slot: "expand",
//     label: ">"
//   }
// ];

const MyTabels = ref(null);
function clearSelection() {
  MyTabels.value.clearSelection();
}

function handlePagination(val) {
  console.log(val);
}

onMounted(() => {});
</script>

<style lang="scss" scoped>
// .home {
//   width: 100%;
//   height: 100%;
// }
</style>
