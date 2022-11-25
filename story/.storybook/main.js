const path = require("path");
const { getLoaders, loaderByName, addBeforeLoader } = require("@craco/craco");

const packages = path.join(__dirname, "./../packages/*");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: (webpackConfig) => {
    const { matches } = getLoaders(webpackConfig, loaderByName("babel-loader"));

    addBeforeLoader(
      webpackConfig,
      (rule) => {
        const matched =
          rule.include?.reduce((p, c) => {
            return p || c.includes("story/src");
          }, false) === true && rule.loader.includes("babel-loader");
        return matched;
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      }
    );

    const match = matches.filter((match) => {
      const matched =
        match.loader.include?.reduce((p, c) => {
          return p || c.includes("story/src");
        }, false) === true;
      return matched;
    })[0];

    const include = Array.isArray(match.loader.include)
      ? match.loader.include
      : [match.loader.include];
    match.loader.include = include.concat(packages);

    match.use = [
      { loader: match.loader, options: match.options },
      {
        loader: "@linaria/webpack-loader",
        options: {
          sourceMap: process.env.NODE_ENV !== "production",
        },
      },
    ];

    delete match.loader;
    delete match.options;

    return webpackConfig;
  },
};
