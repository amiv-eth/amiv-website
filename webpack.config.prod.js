var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

var config = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source

    entry: './index.js',

    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: 'bundle.js'
    },

    //To run development server
    devServer: {
        contentBase: __dirname,
    },

    module: {
        rules: [
            {
                test: /\.js$/, // Check for all js files
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }]
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],

    devtool: "" // No source map for production build
};

module.exports = config;