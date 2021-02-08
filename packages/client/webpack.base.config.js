const { resolve } = require("path");

module.exports = {
  resolve: {
    modules: [resolve("src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    mainFiles: ["index", "index.web"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              // By default, css-loader generates JS modules that use the ES modules syntax
              // conflict with isomorphic-style-loader
              esModule: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: resolve(__dirname, "src", "client", "resources", "fonts"),
        loader: "url-loader",
        options: {
          limit: true,
          // name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: true,
            },
          },
        ],
      },
    ],
  },
};
