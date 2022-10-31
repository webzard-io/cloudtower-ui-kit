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
        prefix: "@import 'src/styles/common/variables.scss';",
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
  ...[
    "forms.tsx",
    "forms2.tsx",
    "global-search.ts",
    "react-hooks.ts",
    "tables.tsx",
  ].map((name) => {
    return {
      input: [`src/generated/${name}`],
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
          prefix: "@import 'src/styles/common/variables.scss';",
        }),
        visualizer({
          emitFile: true,
          filename: "stats1.html",
        }),
      ],
      output: [
        {
          dir: "dist/umd/generated",
          name: "index",
          format: "umd",
        },
        {
          dir: "dist/esm/generated",
          name: "index",
          format: "esm",
        },
      ],
    };
  }),
]);

export default config;
