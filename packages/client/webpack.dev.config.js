const { resolve } = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { merge } = require("webpack-merge");

const resolvePath = (pathstr) => resolve(__dirname, pathstr);

const baseConfig = require("./webpack.base.config");

const DEV_CONFIG = {
  context: resolve("browser"),
  entry: "./index.js",
  mode: "development",
  output: {
    filename: "index.js", // 设置打包后的文件名
    path: resolvePath("./dist/static"), // 设置构建结果的输出目录
  },
  devServer: {
    contentBase: "./browser",
    compress: true,
    port: 9000,
    disableHostCheck: true,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            // TODO: prod
            plugins: [
              require.resolve("react-refresh/babel"),
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        APP_ENV: JSON.stringify(process.env.APP_ENV || "production"),
      },
    }),
  ],
  optimization: {},
};

module.exports = merge(baseConfig, DEV_CONFIG);
