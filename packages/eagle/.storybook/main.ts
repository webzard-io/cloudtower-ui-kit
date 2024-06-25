import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";
import linaria from "@linaria/vite";
import sass from "sass";
import fs from "fs";
import path from "path";

const VariableSassPath = path.resolve(
  __dirname,
  "../src/styles/common/variables.scss",
);

const AnimationPath = path.resolve(
  __dirname,
  "../src/styles/common/animation.scss",
);
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../stories/**/*.mdx",
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
    const animationData = fs.readFileSync(AnimationPath, {
      encoding: "utf-8",
    });

    const finalConfig = mergeConfig(config, {
      resolve: {
        alias: {
          "@cloudtower/parrot": path.resolve(
            __dirname,
            "../../parrot/src/index.ts",
          ),
          "@src": path.resolve(__dirname, "../src/"),
          "@stories": path.resolve(__dirname, "../stories/"),
        },
      },
      plugins: [
        {
          name: "vite:react-babel",
          enforce: "pre",
          config: () => ({
            esbuild: {
              jsx: "transform",
            },
          }),
        },
        linaria({
          preprocessor: (selector, cssText) => {
            const compileText = sass
              .renderSync({
                data: [
                  varData,
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
    });
    return finalConfig;
  },
};

export default config;
