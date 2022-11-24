const { mergeConfig } = require("vite");
const { checker } = require("vite-plugin-checker");
const linaria = require("@linaria/rollup");
const scss = require("rollup-plugin-scss");
const path = require("path");

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
          "@cloudtower/eagle/generated/react-hooks": path.resolve(
            __dirname,
            "../../eagle/src/generated/react-hooks.ts"
          ),
          "@cloudtower/eagle/generated/forms": path.resolve(
            __dirname,
            "../../eagle/src/generated/forms.tsx"
          ),
          "@cloudtower/eagle/generated/forms-types": path.resolve(
            __dirname,
            "../../eagle/src/generated/forms-types.tsx"
          ),
          "@cloudtower/eagle/kit/specify": path.resolve(
            __dirname,
            "../../eagle/src/kit/specify"
          ),
          "@cloudtower/eagle/kit/smartx": path.resolve(
            __dirname,
            "../../eagle/src/kit/smartx"
          ),
          "@cloudtower/parrot": "@cloudtower/parrot/src/index.ts",
        },
      },
      addons: ["storybook-react-i18next"],
    });
  },
};
