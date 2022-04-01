const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
module.exports = {
	entry: './index.jsx', // 입력
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'build.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [path.join(__dirname, 'src'), 'node_modules']
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node-modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: '> 2%, not dead',
								corejs: 3,
								useBuiltIns: 'entry',
								modules: false,
								shippedProposals: true
							}
						],
						'@babel/preset-react'
					],
					plugins: [['@babel/plugin-transform-runtime']]
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './build/index.html',
			filename: 'index.html'
		})
	],
	optimization: {
		minimizer: [
			new TerserJsPlugin({
				extractComments: false
			})
		]
	}
};
