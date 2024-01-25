import linaria from "@linaria/rollup";
import alias from "@rollup/plugin-alias";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import url from "postcss-url";
import { defineConfig } from "rollup";
import copy from "rollup-plugin-copy";
import esbuild from "rollup-plugin-esbuild";
import nodePolyfills from "rollup-plugin-polyfill-node";
import scss from "rollup-plugin-scss";
import { visualizer } from "rollup-plugin-visualizer";

const projectRootDir = path.resolve(__dirname);

const config = defineConfig([
  // bundle components & styles
  {
    input: ["src/index.ts"],
    plugins: [
      nodePolyfills(),
      alias({
        customResolver: resolve({ extensions: [".tsx", ".ts"] }),
        entries: Object.entries({
          "@src/*": ["./src/*"],
        }).map(([alias, value]) => ({
          find: new RegExp(`${alias.replace("/*", "")}`),
          replacement: path.resolve(
            projectRootDir,
            `${value[0].replace("/*", "")}`
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
      }),
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
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
        dir: "dist/umd",
        name: "index",
        format: "umd",
        interop: "auto",
      },
      {
        dir: "dist/esm",
        name: "index",
        format: "esm",
      },
    ],
  },
  {
    input: ["src/index.ts"],
    plugins: [
      nodePolyfills(),
      alias({
        customResolver: resolve({ extensions: [".tsx", ".ts"] }),
        entries: Object.entries({
          "@src/*": ["./src/*"],
        }).map(([alias, value]) => ({
          find: new RegExp(`${alias.replace("/*", "")}`),
          replacement: path.resolve(
            projectRootDir,
            `${value[0].replace("/*", "")}`
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
        classNameSlug: (hash, title) => `E_${hash}`,
      }),
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        output: "dist/components.css",
        processor: () =>
          postcss([
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
      }),
      image({
        base64: true,
      }),
      visualizer({
        emitFile: true,
        filename: "stats1.html",
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
    input: ["src/styles/token/token.ts"],
    plugins: [
      esbuild.default(),
      scss({
        output: "dist/token.css",
        exclude: ["*.ts", "*.scss"]
      }),
    ]
  },
]);

export default config;
