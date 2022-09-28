var webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "main.js",
    publicPath: "/dist/",
  },
  cache: false,
  devtool: "source-map",
  entry: ["./src/index.ts"],

  stats: {
    colors: true,
    reasons: true,
  },

  resolve: {
    extensions: ["", ".ts", ".js"],
    alias: {
      styles: __dirname + "/src/styles",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [],
  devServer: {
    static: "./dist",
    hot: true,
    client: {
      logging: "verbose",
    },
    compress: true,
    port: 9000,
  },
};
