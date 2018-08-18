const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: path.resolve(__dirname, 'assets/js/index.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public/build/'),
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: 'base.html.twig',
        loader: "twig-loader",
        options: {
        },
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'assets/js'), 'node_modules'],
  },
  devtool: process.env.WEBPACK_SERVE ? 'cheap-module-eval-source-map' : 'none',
  plugins: [
    process.env.WEBPACK_SERVE && new HtmlWebpackPlugin({
      template: 'templates/base.html.twig'
    }),
    new CleanWebpackPlugin(['public/build']),
    new ManifestPlugin()
  ],
};
