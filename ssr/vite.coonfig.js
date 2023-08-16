import { defineConfig } from "vite";
import plugins from "../plugins";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins(),
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "#": resolve(__dirname, "../")
    }
  },
  server: {
    host: true,
    open: false
  }
});
