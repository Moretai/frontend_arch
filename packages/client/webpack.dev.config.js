const { resolve } = require("path");
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");

const resolvePath = (pathstr) => resolve(__dirname, pathstr);

const baseConfig = require("./webpack.base.config");

const DEV_CONFIG = {
  // context: resolve("src"),
  entry: "./src/index.js",
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        APP_ENV: JSON.stringify(process.env.APP_ENV || "production"),
      },
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        card: "card@http://localhost:3002/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
  optimization: {},
};

module.exports = merge(baseConfig, DEV_CONFIG);
