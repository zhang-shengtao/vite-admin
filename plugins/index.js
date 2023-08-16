import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vuesetupExtend from "vite-plugin-vue-setup-extend";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import externalGlobals from "rollup-plugin-external-globals";
import { visualizer } from "rollup-plugin-visualizer";

export default function () {
  let plugins = [
    vue(),
    vuesetupExtend(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      symbolId: "my-[name]"
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteCompression({
      threshold: 512000, // 超过500k就压缩
      algorithm: "gzip",
      deleteOriginFile: false
    }),
    importToCDN({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.min.js"
        },
        { name: "vue-demi", var: "VueDemi", path: "https://cdn.staticfile.org/vue-demi/0.14.5/index.iife.min.js" },
        {
          name: "element-plus",
          var: "ElementPlus",
          path: "https://cdn.staticfile.org/element-plus/2.3.8/index.full.min.js",
          css: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.8/index.css"
        },
        {
          name: "pinia",
          var: "Pinia",
          path: "https://cdn.staticfile.org/pinia/2.1.6/pinia.iife.prod.min.js"
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://cdn.staticfile.org/vue-router/4.2.4/vue-router.global.prod.min.js"
        },
        {
          name: "axios",
          var: "axios",
          path: "https://cdn.shiankuaixian.com/web/axios.min.js"
        },
        {
          name: "@element-plus/icons-vue",
          var: "ElementPlusIconsVue",
          path: "https://cdn.staticfile.org/element-plus-icons-vue/2.1.0/global.iife.min.js"
        }
      ]
    }),
    AutoImport({
      dts: false,
      imports: ["vue", "vue-router", "pinia"]
    }),
    visualizer({
      // open: true
    }),
    {
      ...externalGlobals({
        vue: "Vue",
        "vue-demi": "VueDemi",
        pinia: "Pinia",
        "vue-router": "VueRouter",
        "element-plus": "ElementPlus",
        axios: "axios",
        ElementPlusIconsVue: "@element-plus/icons-vue"
      }),
      enforce: "post",
      apply: "build"
    }
  ];
  return plugins;
}
