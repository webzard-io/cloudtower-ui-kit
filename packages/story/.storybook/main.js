const { mergeConfig } = require("vite");
const { checker } = require("vite-plugin-checker");
const linaria = require("@linaria/rollup");
const scss = require("rollup-plugin-scss");
const css = require("rollup-plugin-css-only");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../eagle/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../sparrow/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        linaria.default({
          sourceMap: true,
          preprocessor: "none",
        }),
        scss(),
        checker({ typescript: true, exclude: "node_modules" }),
      ],
      resolve: {
        alias: {
          "@cloudtower/eagle": "@cloudtower/eagle/index.ts",
          "@cloudtower/parrot": "@cloudtower/parrot/index.ts",
        },
      },
      addons: ["storybook-react-i18next"],
    });
  },
};
