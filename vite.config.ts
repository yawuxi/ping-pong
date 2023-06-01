import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve("src/components"),
      features: path.resolve("src/features"),
      assets: path.resolve("src/assets"),
      store: path.resolve("src/store"),
      constants: path.resolve("src/constants"),
      utils: path.resolve("src/utils"),
      data: path.resolve("src/data"),
      routing: path.resolve("src/routing"),
      types: path.resolve("src/types"),
      pages: path.resolve("src/pages"),
      services: path.resolve("src/services"),
      http: path.resolve("src/http"),
      layout: path.resolve("src/layout"),
      scss: path.resolve("src/scss"),
    },
  },
});
