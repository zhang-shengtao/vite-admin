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
    open: config.open,
    cors: true,
    proxy: {
      "^/api": {
        target: config.baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  preview: {
    proxy: {
      "^/api": {
        target: config.baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    outDir: "build",
    copyPublicDir: false,
    rollupOptions: {
      external: ["vue", "vue-demi", "pinia", "vue-router", "element-plus", "axios", "@element-plus/icons-vue"],
      output: {
        assetFileNames(pattern) {
          if (pattern.name.endsWith(".css")) return "css/[name]-[hash].css";
          if ([".png", ".jpg", ".svg", "jpeg", ".webp", ".gif", ".ico"].some((ext) => pattern.name.endsWith(ext))) {
            return "img/[name]-[hash].[ext]";
          }
          return "assest/[name]-[hash].[ext]";
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js"
      }
    }
  }
});
