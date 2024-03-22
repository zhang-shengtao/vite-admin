<template>
  <div>
    <el-card class="box-card">
      <el-button v-file:[accsp]="fileUpload">切片上传</el-button>
      <el-button v-file:[accsp]="ttfView">读取ttf woff woffs文件内容</el-button>
    </el-card>
    <el-card style="margin-top: 10px" v-if="svgs.length">
      <div v-for="item in svgs" class="list">
        <div class="iconItem" v-html="item.svg"></div>
        <div>{{ item.unicode }}</div>
        <div>{{ item.name }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { sliceFile } from "@/utils/method.js";
import fontApi, { Font, woff2 } from "fonteditor-core";
import glyf2svg from "fonteditor-core/src/ttf/util/glyf2svg";
const accsp = ".woff2,.ttf,.woff";
async function fileUpload(files) {
  console.time("切片时间");
  const fileBolb = await sliceFile(files[0]);
  console.log(fileBolb);
  console.timeEnd("切片时间");
}
const svgs = reactive([]);

function ttfView(files) {
  const name = files[0].name;
  const type = name.slice(name.lastIndexOf(".") + 1).toLowerCase();
  let fileReader = new FileReader();
  fileReader.onload = function (e) {
    const buffer = e.target.result;
    woff2.init("/woff2.wasm").then(() => {
      const ttf = Font.create(buffer, { type }).data;
      let unitsPerEm = ttf.head.unitsPerEm;
      let descent = ttf.hhea.descent;
      ttf.glyf.forEach((element) => {
        const svgPath = glyf2svg(element, ttf);
        const svg = `<svg class="svgItem" viewbox="0 0 ${unitsPerEm} ${unitsPerEm}"><g transform="scale(1, -1) translate(0, -${
          unitsPerEm + descent
        }) scale(0.9, 0.9) "><path class="path" style="fill:#666" d="${svgPath}"/></g></svg>`;
        const g = {
          svg,
          unicode: (element.unicode || []).map((u) => "\\" + u.toString(16).toLocaleLowerCase()).join(","),
          name: element.name
        };
        if (svgPath) svgs.push(g);
      });
    });
  };
  fileReader.readAsArrayBuffer(files[0]);
}
</script>

<style scoped lang="scss">
.contextmenu {
  background-color: aliceblue;
  min-width: 100px;
  max-width: 280px;
}

.list {
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  // width: 80px;
  .iconItem {
    width: 80px;
    margin: 0 auto;
    .svgItem {
      width: 100%;
      height: 80px;
    }
  }
}
</style>
