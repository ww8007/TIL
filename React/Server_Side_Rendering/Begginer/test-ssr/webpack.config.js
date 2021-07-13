const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer) {
  return {
    // -1-
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    // -1-
    output: {
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js', //-2-
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    target: isServer ? 'node' : 'web', //-3-
    externals: isServer ? [nodeExternals()] : [], //-4-
    node: {
      __dirname: false, // -5-
    },
    // -6-
    optimization: isServer
      ? {
          splitChunks: false,
          minimize: false,
        }
      : undefined,
    // -6-
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js' //-7-
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true, //-8-
            },
          },
        },
      ],
    },
    plugins: isServer //-9-
      ? []
      : [new HtmlWebpackPlugin({ template: './template/index.html' })],
    mode: 'production',
  };
}
module.exports = [getConfig(false), getConfig(true)];
