import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import VitePluginLinaria from "vite-plugin-linaria";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "UI-BUSINESS",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "@cloudtower/ui-kit"],
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
