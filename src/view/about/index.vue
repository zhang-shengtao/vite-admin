<template>
  <el-card class="box-card">
    <el-card class="box-card" v-rightmens:[menu]="contextmenu">
      <el-table :data="tableData" border show-summary style="width: 100%; margin-top: 20px">
        <el-table-column type="expand" label="测试">
          <template #default="{ row, $index }"> 自定义展开行{{ row.amount1 }} </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="amount1" label="amount1" sortable>
          <template #default="{ row }">
            {{ row.amount1 }}
          </template>
        </el-table-column>
        <el-table-column prop="amount2" label="amount2" sortable>
          <template #expand="{ row, $index }"> {{ row.amount2 }}->{{ $index }} </template>
        </el-table-column>
      </el-table>
      <el-button v-file.multiple="contextmenu">指令传参更新</el-button>
    </el-card>
    <el-card class="box-card" style="margin-top: 10px" v-rightmens:[menus]="contextmenu">
      <el-button @click="menus[2].value = 4">指令传参更新s</el-button>
    </el-card>
  </el-card>
</template>

<script setup>
import { sliceFile } from "@/utils/method.js";
import { watch } from "vue";
function fileUpload() {
  const input = document.createElement("input");
  input.type = "file";
  input.click();
  const files = [];
  input.onchange = async function () {
    console.time("切片时间");
    for (let item of input.files) {
      files.push(item);
    }
    const fileBolb = await sliceFile(files[0]);
    console.log(fileBolb);
    console.timeEnd("切片时间");
  };
}

function formatter(row, column, cellValue, index) {
  return row.amount3.a + "自定义的";
}
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2];
    } else if (columnIndex === 1) {
      return [0, 0];
    }
  }
};
function getSummaries(param) {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total Cost";
      return;
    }
    const values = data.map((item) => Number(item[column.property]));
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)}`;
    } else {
      sums[index] = "N/A";
    }
  });
  return sums;
}
const tableData = [
  {
    id: "12987122",
    name: "Tom",
    amount1: "234",
    amount2: "3.2",
    amount3: {
      a: 11
    }
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "165",
    amount2: "4.43",
    amount3: {
      a: 9
    }
  },
  {
    id: "12987124",
    name: "Tom",
    amount1: "324",
    amount2: "1.9",
    amount3: {
      a: 10
    }
  },
  {
    id: "12987125",
    name: "Tom",
    amount1: "621",
    amount2: "2.2",
    amount3: {
      a: 17
    }
  },
  {
    id: "12987126",
    name: "Tom",
    amount1: "539",
    amount2: "4.1",
    amount3: {
      a: 15
    }
  }
];

const menu = reactive([
  {
    label: "测试1",
    value: 1
  },
  {
    label: "测试2",
    value: 2
  },
  {
    label: "测试3",
    value: 3
  }
]);

const menus = [
  {
    label: "测试4",
    value: 4
  },
  {
    label: "测试5",
    value: 5
  },
  {
    label: "测试6",
    value: 6
  }
];

function contextmenu(param) {
  console.log(param);
}
</script>

<style scoped lang="scss">
.contextmenu {
  background-color: aliceblue;
  min-width: 100px;
  max-width: 280px;
}
</style>
