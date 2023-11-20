const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./index.ts",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html"
		})
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	devServer: {
		compress: true,
		port: 9000,
		hot: true
	}
};
