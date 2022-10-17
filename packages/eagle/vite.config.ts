import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import VitePluginLinaria from "vite-plugin-linaria";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "eagle",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-i18next", "i18next"],
      output: {
        globals: {
          react: "react",
          "react-i18next": "react-i18next",
          i18next: "i18next",
        },
      },
      plugins: [VitePluginLinaria()],
    },
  },
  plugins: [dts(), visualizer()],
});
