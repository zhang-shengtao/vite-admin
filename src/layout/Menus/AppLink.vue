<template>
  <component :is="dom" :="to" @click="fn">
    <slot />
  </component>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { userPinia } from "@/pinia";
const { isCollapse, isPc } = storeToRefs(userPinia());

const props = defineProps(["path"]);
const to = reactive({
  to: props.path
});
const dom = ref("RouterLink");

if (props.path.startsWith("http")) {
  dom.value = "a";
  delete to.to;
  to.href = props.path;
  to.target = "_blank";
} else {
  to.to = props.path;
  delete to.href;
  delete to.target;
}

function fn() {
  if (!isPc.value) isCollapse.value = false;
}
</script>

<style lang="scss" scoped></style>
