import linaria from "@linaria/rollup";
import image from "@rollup/plugin-image";
import path from "path";
import postcss from "postcss";
import url from "postcss-url";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import scss from "rollup-plugin-scss";
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
        processor: () =>
          postcss([
            url({
              url: "inline",
              basePath: [path.resolve("src/styles/fonts")],
            }),
          ]),
        failOnError: true,
      }),
      image({
        base64: true,
      }),
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
