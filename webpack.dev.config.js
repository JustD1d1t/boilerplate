const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: ["./src/pages/index/index.js", "./src/pages/index/index.scss"],
    kiwi: ["./src/pages/kiwi/kiwi.js", "./src/pages/kiwi/index2.scss"],
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "development",
  devServer: {
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        enforce: "pre",
        loader: "import-glob-loader",
      },
      {
        test: /\.(svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData:
                '@import "bootstrap"; @import "./src/styles/_main.scss"; @import "./src/styles/_override-bootstrap.scss"; @import "./src/styles/_variables.scss"; @import "./src/components/footer/_footer.scss"; @import "./src/components/nav/nav.scss";',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/index.css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/pages/index/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/kiwi/index.html",
      filename: "kiwi/index.html",
      chunks: ["kiwi"],
      inject: true,
    }),
  ],
};
