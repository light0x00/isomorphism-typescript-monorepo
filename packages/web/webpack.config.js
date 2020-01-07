const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
module.exports = {
	mode: "production",
	devtool: "inline-source-map",
	entry: resolve(__dirname, "src/index.ts"),
	output: {
		path: resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve:{
		extensions:[".ts",".js"],
		alias: {
			"lodash": "lodash-es",
		},
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
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			reportFilename: "analyzer-report.html",
			openAnalyzer: false,
		}),
		/* 实测比 import 'lodash/xx' 的方式要小一半 */
		// new LodashWebpackPlugin({})
	]
};