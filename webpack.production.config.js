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
    filename: "[name]/index.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 5000,
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
        generator: {
          filename: "resources/svg/[name][ext]",
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
        generator: {
          filename: "resources/images/[name][ext]",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
      filename: "[name]/index.[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/resources", to: "resources" }],
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
