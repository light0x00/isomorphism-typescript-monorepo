const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = {
	mode: "production",
	/* 可见代码行、列、源码,单独文件 */
	devtool: "eval-source-map",
	/* 可见代码行、列、源码,内联在bundle里 */
	// devtool: "inline-source-map",
	/* 可见行,无源码 */
	// devtool: "nosources-source-map",
	/* 可见代码行、列、源码,,单独文件 */
	// devtool: "source-map",
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
		})
	]
};