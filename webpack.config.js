var path = require('path');

module.exports = {
	devtool: "cheap-eval-source-map",
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['env'],
					plugins: ["transform-regenerator", "transform-es2015-spread"]
				}
			}
		]
	},
	plugins: [],
	devServer: {
		port: 3000,
		contentBase: './dist/html',
		watchContentBase: true
	}
};