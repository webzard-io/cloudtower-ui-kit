import linaria from "@linaria/rollup";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import scss from "rollup-plugin-scss";
import { visualizer } from "rollup-plugin-visualizer";

const config = defineConfig([
  {
    input: ["index.ts"],
    plugins: [
      nodePolyfills(),
      esbuild.default({
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
      linaria.default({
        sourceMap: false,
        preprocessor: "none",
      }),
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        output: "dist/style.css",
        failOnError: true,
        prefix: "@import '../common/variables.scss';",
      }),
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }),
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
]);

export default config;
