const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    context: path.resolve(`${__dirname}/src`),
    resolve: { extensions: [ '', '.js', '.jsx' ] },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [ 'babel-loader' ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
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
        new ExtractTextWebpackPlugin("styles.css"),
        new CopyWebpackPlugin([{
            from: 'assets/data-sample.json'
            ,
            to: 'data-sample.json'
        }], { copyUnmodified: true, debug: true })
    ]
}
