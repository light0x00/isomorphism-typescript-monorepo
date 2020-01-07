const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: resolve(__dirname, "src/index.ts"),
	output: {
		path: resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve:{
		extensions:[".ts"]
	},
	module:{
		rules:[
			{
				test:/\.ts/,
				loader:"ts-loader"
			}
		]
	}
	,
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, "src/index.html"),
			filename: `index.html`,
		})
	]
};