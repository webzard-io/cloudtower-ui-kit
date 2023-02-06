import json from "@rollup/plugin-json";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { visualizer } from "rollup-plugin-visualizer";

const config = defineConfig([
  {
    input: ["src/index.ts"],
    plugins: [
      nodePolyfills(),
      esbuild.default({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: true,
        minify: process.env.NODE_ENV === "production",
        target: "es2017",
        define: {},
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json",
          ".js": "jsx",
        },
      }),
      json(),
      visualizer({
        emitFile: true,
        filename: "stats1.html",
      }),
    ],
    output: [
      {
        dir: "dist/umd",
        name: "index",
        format: "umd",
      },
      {
        dir: "dist/esm",
        name: "index",
        format: "esm",
      },
    ],
  },
]);

export default config;
