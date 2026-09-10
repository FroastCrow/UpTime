const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/js/index.js",
  // entry: "./src/scss/main.scss",
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "auto",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
              sassOptions: {
                outputStyle: "expanded",
                // Додаємо шлях до scss файлів для правильного резолвингу @use
                loadPaths: [path.resolve(__dirname, "src/scss")],
              },
              // Автоматично додаємо @use "vars" as *; до всіх SCSS файлів
              // Тепер не потрібно додавати цей рядок вручну в кожен файл
              additionalData: (content, loaderContext) => {
                // Не додаємо @use "vars" до самого файлу vars.scss
                if (loaderContext.resourcePath.includes("vars.scss")) {
                  return content;
                }
                return `@use "vars" as *;\n${content}`;
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: true,
              // sources: false,
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
      // inject: false,
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/error-page.html",
      filename: "404.html",
      inject: "body",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/privacy-policy.html",
      filename: "privacy-policy.html",
      inject: "body",
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "src/js/index.js",
    //       to: "js/script.js",
    //     },
    //   ],
    // }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  externals: {
    jquery: "jQuery",
    swiper: "Swiper",
  },
};
