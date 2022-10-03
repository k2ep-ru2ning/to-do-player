const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DEV_MODE = "development";
const PROD_MODE = "production";
const isDevelopment = process.env.NODE_ENV !== PROD_MODE;

module.exports = {
  name: "FPS - TodoList and Timer App",
  mode: isDevelopment ? DEV_MODE : PROD_MODE,
  devtool: isDevelopment ? "eval-cheap-module-source-map" : false,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./src/main",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3",
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [isDevelopment && "react-refresh/babel"].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "assets/[name].css",
      }),
  ].filter(Boolean),
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
