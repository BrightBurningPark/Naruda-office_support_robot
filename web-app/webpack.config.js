// ./web-app/webpack.config.js

const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const port = process.env.PORT || 3000;

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '../../theme.config$': path.resolve(__dirname, './src/theme.config')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        /*  style-loader, css-loader 활용법
        * import { padaLog } from '../styles/padalog.css
        */
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      favicon: './src/public/favicon.ico'
    }),
    new webpack.ProvidePlugin(
      {
        $: 'jquery',
        'jQuery': 'jquery',
        'jquery': 'jquery',
        'window.jQuery': 'jquery',
      }
    ),
  ],
  devServer: {
    filename: 'bundle.js',
    contentBase: './dist',
    host: '0.0.0.0',
    port: port,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      "**": "http://localhost:3000"
    }
  }
};
