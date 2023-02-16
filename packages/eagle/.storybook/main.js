const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");

const GlobalSassPath = path.resolve(
  __dirname,
  "../src/styles/common/variables.scss"
);
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    const { loader, options } = config.module.rules[2].oneOf[3];

    config.module.rules[2].oneOf[3].use = [
      {
        loader: require.resolve("linaria/loader"),
        options: {
          babelOptions: {
            presets: [...options.presets],
          },
        },
      },
    ];

    config.module.rules.push(
      {
        test: /\.m?js$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /(linaria\.css|scss)$/,
        use: [
          // process.env.NODE_ENV === "production"
          //   ? {
          //       loader: MiniCssExtractPlugin.loader,
          //     }
          //   : "style-loader",
          // {
          //   loader: "css-loader",
          //   options: {
          //     sourceMap: process.env.NODE_ENV !== "production",
          //   },
          // },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceComments: false,
              },
              additionalData: () =>
                fs.readFileSync(GlobalSassPath, "utf8", (err, file) => {
                  return file;
                }),
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
      loader: "ts-loader",
      options: {
        transpileOnly: true,
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      },
    });

    delete config.module.rules[2].oneOf[3].loader;
    delete config.module.rules[2].oneOf[3].options;

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
