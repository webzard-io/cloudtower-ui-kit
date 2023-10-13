import { dirname, join } from "path";
const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const VariableSassPath = path.resolve(
  __dirname,
  "../src/styles/common/variables.scss"
);

const AnimationPath = path.resolve(__dirname, 
  "../src/styles/common/animation.scss"
)

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-designs"),
    {
      name:  '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.@(js|jsx|ts|tsx)?$/], //This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    }
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {}
  },

  typescript: {
    reactDocgen: "react-docgen-typescript-plugin",
  },

  webpackFinal: async (config, { configType }) => {
    const varData = fs.readFileSync(VariableSassPath, {
      encoding: "utf8",
    });
    const animationData = fs.readFileSync(AnimationPath, {
      encoding: "utf-8",
    })

    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push(
      {
        test: /(\.(scss))$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceComments: false,
              },
            },
          },
        ],
      },
      {
        test: /(\.(linaria\.css|scss))$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceComments: false,
              },
              additionalData:  [
                varData,
                animationData
              ].join('\n')
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

  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
