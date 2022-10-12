const { mergeConfig } = require("vite");
const { checker } = require("vite-plugin-checker");
const VitePluginLinaria = require("vite-plugin-linaria");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../../ui-business/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../ui-kit/src/**/*.stories.@(js|jsx|ts|tsx)",
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
        VitePluginLinaria(),
        checker({ typescript: true, exclude: "node_modules" }),
      ],
      resolve: {
        alias: {
          "@cloudtower/ui-business": "@cloudtower/ui-business/index.ts",
          "@cloudtower/ui-i18n": "@cloudtower/ui-i18n/index.ts",
          "@cloudtower/ui-kit": "@cloudtower/ui-kit/index.ts",
        },
      },
      addons: ["storybook-react-i18next"],
    });
  },
};
