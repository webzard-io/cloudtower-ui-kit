import { transformWithEsbuild } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";
import linaria from "@linaria/vite";
import sass from "sass";
import fs from "fs";
import path from "path";

const VariableSassPath = path.resolve(
  __dirname,
  "../src/styles/common/variables.scss",
);
const ColorSassPath = path.resolve(__dirname, "../src/styles/token/color.scss");
const AnimationPath = path.resolve(
  __dirname,
  "../src/styles/common/animation.scss",
);
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.@(js|jsx|ts|tsx|mdx)?$/], //This is default
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  // typescript: {
  //   reactDocgen: "react-docgen",
  // },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    const varData = fs.readFileSync(VariableSassPath, {
      encoding: "utf-8",
    });
    const colorData = fs.readFileSync(ColorSassPath, {
      encoding: "utf-8",
    });
    const animationData = fs.readFileSync(AnimationPath, {
      encoding: "utf-8",
    });

    // Remove @vitejs/plugin-react injected by @storybook/react-vite to avoid
    // JSX transform conflicts with @linaria/vite. When both plugins process
    // the same .tsx file, @vitejs/plugin-react's Babel transform can
    // re-generate code from AST that still contains untransformed JSX,
    // causing intermittent build-import-analysis parse errors on Vercel.
    // We replace it with a direct esbuild transform below.
    const filteredPlugins = (config.plugins || [])
      .flat()
      .filter((p: any) => !(p && p.name && p.name.startsWith("vite:react")));

    return {
      ...config,
      plugins: [
        ...filteredPlugins,
        {
          name: "force-tsx-transform",
          enforce: "pre" as const,
          async transform(code: string, id: string) {
            if (/\.[jt]sx$/.test(id) && !id.includes("node_modules")) {
              return transformWithEsbuild(code, id, {
                jsx: "transform",
                jsxFactory: "React.createElement",
                jsxFragment: "React.Fragment",
              });
            }
          },
        },
        linaria({
          preprocessor: (selector, cssText) => {
            const compileText = sass
              .renderSync({
                data: [
                  varData,
                  `\n`,
                  colorData,
                  `\n`,
                  animationData,
                  `${selector} { ${cssText} }`,
                ].join("\n"),
              })
              .css.toString();
            return compileText;
          },
          sourceMap: true,
        }),
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...((config.resolve?.alias as Record<string, string>) || {}),
          "@cloudtower/parrot": path.resolve(
            __dirname,
            "../../parrot/src/index.ts",
          ),
          "@src": path.resolve(__dirname, "../src/"),
          "@stories": path.resolve(__dirname, "../stories/"),
          "moment/locale": "moment/dist/locale",
        },
      },
    };
  },
};

export default config;
