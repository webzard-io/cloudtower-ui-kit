const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = path.join(__dirname, "../packages");

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(packages);

        webpackConfig.module.rules.shift({
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        });
        
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
      }
      return webpackConfig;
    },
  },
};
