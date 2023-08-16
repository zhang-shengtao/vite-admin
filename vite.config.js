import { defineConfig } from "vite";
import plugins from "./plugins";
import { resolve } from "path";
import config from "./setting/config";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: plugins(),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "#": resolve(__dirname)
    }
  },
  server: {
    host: config.host,
    open: config.open
  },
  build: {
    outDir: "build",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      external: ["vue", "vue-demi", "pinia", "vue-router", "element-plus", "axios", "@element-plus/icons-vue"],
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        assetFileNames({ name }) {
          const isImg = ["png", "jpg", "svg", "jpeg", "webp"].includes(name.split(".")[1]);
          if (isImg) return "img/[name]-[hash].[ext]";
          return "[ext]/[name]-[hash].[ext]";
        },
        chunkFileNames() {
          return "js/[name]-[hash].js";
        },
        entryFileNames: "js/[name]-[hash].js"
      }
    }
  }
});
