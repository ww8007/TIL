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
			template: "./index.html" // 원본 HTML 파일 위치
		})
	],
	devServer: {
		compress: true,
		port: 9000,
		hot: true // 핫 리로딩 활성화
	}
};
