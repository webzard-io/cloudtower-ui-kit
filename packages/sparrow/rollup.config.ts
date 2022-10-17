import { defineConfig, Plugin } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { visualizer } from "rollup-plugin-visualizer";
import linaria from "@linaria/rollup";
import css from "rollup-plugin-css-only";

const config = defineConfig({
  input: ["index.ts"],
  plugins: [
    resolve(),
    commonjs(),
    linaria({
      sourceMap: process.env.NODE_ENV !== "production",
    }),
    css({
      output: "styles.css",
    }) as Plugin,
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
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  external: ["react", "@linaria/core", "react-i18next", "i18next", "antd"],
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
});

export default config;
