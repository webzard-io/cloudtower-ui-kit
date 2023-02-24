const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const GlobalSassPath = path.resolve(
  __dirname,
  "../src/styles/common/variables.scss"
);
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    const additionalData = fs.readFileSync(GlobalSassPath, {
      encoding: "utf8",
    });

    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push(
      {
        test: /(\.(linaria\.css|scss))$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceComments: false,
              },
              additionalData,
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          process.env.NODE_ENV === "production"
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
                math: "always",
                // https://ant.design/docs/react/customize-theme-cn
                modifyVars: {
                  "@primary-color": "#0080FF",
                  "@link-color": "#0080FF",
                  "@text-color": "#06101F",
                  "@success-color": "#25C764",
                  "@border-radius-base": "3px",
                  "@screen-xs": "1279px",
                  "@screen-sm": "1536px",
                  "@screen-md": "2176px",
                  "@screen-lg": "2304px",
                },
              },
            },
          },
        ],
      }
    );

    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      use: [
        {
          loader: require.resolve("@linaria/webpack-loader"),
          options: {
            preprocessor: "none",
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@cloudtower/parrot": path.resolve(
        __dirname,
        "../../parrot/src/index.ts"
      ),
    };

    return config;
  },
};
