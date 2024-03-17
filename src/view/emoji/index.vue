<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="微信表情" name="weixin">
          <img
            class="emoij"
            v-for="(wx, i) in icon.weixin"
            :key="wx"
            :src="`https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${i}.gif`"
            :alt="wx"
          />
        </el-tab-pane>
        <el-tab-pane label="emoij表情" name="second">
          <span class="emoij" v-for="emo in icon.emojiList" :key="emo">{{ emo }}</span>
        </el-tab-pane>
        <el-tab-pane label="el-icon" name="elIcon">
          <div class="emoij border" @click="copyIconTag(item, $event)" v-for="(item, index) in elIcon" :key="index">
            <Icon :name="item" :size="30" color="#585555de" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="iconify图标库" name="iconify">
          <Icon
            class="emoij"
            :name="item"
            :size="30"
            v-for="(item, index) in icon.iconify"
            :key="index"
            color="#585555de"
          />
        </el-tab-pane>
        <el-tab-pane label="自定义图标" name="icon">
          <Icon
            class="emoij"
            :name="item"
            :size="30"
            v-for="(item, index) in icon.myIcons"
            :key="index"
            color="#585555de"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script setup name="emoji">
import { coyp } from "@/utils/method";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import icon from "@/assets/emoji";
const elIcon = Object.keys(ElementPlusIconsVue);
const activeName = ref("weixin");

const props = defineProps(["test"]);

console.log(props);

function copyIconTag(txts, e) {
  coyp({ txts }, e.target).then(() => {
    ElMessage.success("复制成功");
  });
}
</script>

<style lang="scss" scoped>
.emoij {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin: 5px;
  font-size: 28px;
}
.border {
  border: 1px solid #5f5f5fde;
  padding: 10px;
}
.border:hover {
  background-color: #5855552d;
}
</style>
