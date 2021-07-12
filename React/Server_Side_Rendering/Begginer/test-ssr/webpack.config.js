const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // -1-
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './template/index.html' })], // -2-
  mode: 'production',
};
