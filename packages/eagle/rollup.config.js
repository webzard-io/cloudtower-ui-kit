import linaria from "@linaria/rollup";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import atImport from "postcss-import";
import url from "postcss-url";
import { defineConfig } from "rollup";
import copy from "rollup-plugin-copy";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import scss from "rollup-plugin-scss";
import { visualizer } from "rollup-plugin-visualizer";

import mergeScss from "./tools/merge-linaria-scss";
import antdLessPlugin from "./tools/rollup-plugin-antd-less";

const projectRootDir = path.resolve(__dirname);

const eagleVersionSlug = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"),
).version.replace(/[^a-zA-Z0-9]+/g, "_");

const xtermStyle = fs.readFileSync(
  path.join(projectRootDir, "../../node_modules/@xterm/xterm/css/xterm.css"),
  "utf-8",
);

const config = defineConfig([
  // bundle components & styles
  {
    input: ["src/index.ts"],
    plugins: [
      antdLessPlugin(),
      nodePolyfills(),
      alias({
        customResolver: resolve({ extensions: [".tsx", ".ts"] }),
        entries: Object.entries({
          "@src/*": ["./src/*"],
        }).map(([alias, value]) => ({
          find: new RegExp(`${alias.replace("/*", "")}`),
          replacement: path.resolve(
            projectRootDir,
            `${value[0].replace("/*", "")}`,
          ),
        })),
      }),
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
        classNameSlug: (hash) => `E_${eagleVersionSlug}_${hash}`,
      }),
      mergeScss({
        include: ["src/**/*.scss", "src/**/*.sass", "src/**/*.css"],
        exclude: ["src/styles/libs/antd.css"],
        output: "dist/linaria.merged.scss",
      }),
      image({
        base64: true,
      }),
      visualizer({
        emitFile: true,
        filename: "stats1.html",
      }),
      copy({
        targets: [
          {
            src: "src/styles/common/variables.scss",
            dest: "dist",
            transform: async (content) => {
              const variablesContent = [
                content,
                fs.readFileSync(
                  path.join(__dirname, "src/styles/token/color.scss"),
                  "utf-8",
                ),
              ].join("\n");
              return variablesContent;
            },
          },
        ],
      }),
    ],
    output: [
      {
        dir: "dist/cjs",
        name: "index",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        interop: "auto",
      },
      {
        dir: "dist/esm",
        name: "index",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    treeshake: {
      moduleSideEffects: false,
    },
  },
  {
    input: ["dist/linaria.merged.scss"],
    plugins: [
      scss({
        include: ["dist/linaria.merged.scss"],
        output: "dist/style.css",
        processor: () =>
          postcss([
            url({
              url: "copy",
              basePath: [path.resolve("src/styles/fonts")],
              assetsPath: "assets",
              useHash: true,
            }),
          ]),
        failOnError: true,
        prefix: [
          '@import "./src/styles/libs/antd";',
          '@import "./src/styles/index.scss";',
          '@import "./src/styles/reset";',
          xtermStyle,
        ].join("\n"),
      }),
    ],
  },
  {
    input: ["src/styles/fonts/font.css"],
    plugins: [
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        output: "dist/font.css",
        processor: () =>
          postcss([
            url({
              url: "copy",
              basePath: [path.resolve("src/styles/fonts")],
              assetsPath: "assets",
              useHash: true,
            }),
          ]),
        failOnError: true,
      }),
    ],
  },
  {
    input: ["src/styles/token/index.css"],
    plugins: [
      esbuild.default(),
      scss({
        output: "dist/token.css",
        processor: (css) =>
          postcss([
            atImport({
              path: ["src/styles/token"],
            }),
          ]),
      }),
    ],
  },
  {
    input: ["dist/linaria.merged.scss"],
    plugins: [
      scss({
        include: ["dist/linaria.merged.scss"],
        output: "dist/components.css",
        processor: () =>
          postcss([
            url({
              url: "copy",
              basePath: [path.resolve("src/styles/fonts")],
              assetsPath: "assets",
              useHash: true,
            }),
            {
              postcssPlugin: "removeFontFace",
              prepare: (result) => {
                return {
                  AtRule: {
                    "font-face": (rule) => {
                      rule.remove();
                    },
                  },
                };
              },
            },
          ]),
        failOnError: true,
        prefix: ['@import "./src/styles/index.scss";', xtermStyle].join("\n"),
      }),
    ],
  },
]);

export default config;
