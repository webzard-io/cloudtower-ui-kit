import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import VitePluginLinaria from "vite-plugin-linaria";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "UI-KIT",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "react",
        },
      },
      plugins: [VitePluginLinaria()],
    },
  },
  plugins: [dts()],
});
