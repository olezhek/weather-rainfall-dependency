const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: path.resolve(`${__dirname}/src`),
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [ 'babel-loader' ]
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader")
            }
        ]
    },

    entry: {
        javascript: './js/app.js',
        html: "./index.html"
    },

    output: {
        filename: 'app.js',
        path: path.resolve(`${__dirname}/dist`),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css")
    ]
}