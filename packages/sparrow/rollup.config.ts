import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import postcss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer";

const config = defineConfig([
  {
    input: ["index.ts"],
    plugins: [
      resolve(),
      commonjs(),
      nodePolyfills(),
      esbuild({
        include: /\.[jt]sx?$/,
        exclude: /node_modules/,
        sourceMap: true,
        minify: process.env.NODE_ENV === "production",
        target: "es2017",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment",
        define: {},
        tsconfig: "tsconfig.json",
        loaders: {
          ".json": "json",
          ".js": "jsx",
        },
      }),
      postcss({
        extract: true,
        modules: true,
      }),
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }),
    ],
    external: [
      "react",
      "@linaria/core",
      "react-i18next",
      "i18next",
      "antd",
      "apollo-boost",
      "@smartx/react-final-form-arrays",
    ],
    output: [
      {
        file: "dist/index.umd.js",
        name: "index",
        format: "umd",
      },
      {
        file: "dist/index.mjs",
        name: "index",
        format: "esm",
      },
    ],
  },
  {
    input: ["index.ts"],
    plugins: [dts() as any],
    output: [
      {
        file: "dist/index.d.ts",
        name: "index",
        format: "esm",
      },
    ],
  },
]);

export default config;
