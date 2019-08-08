const CompressionPlugin = require('compression-webpack-plugin');

// Start with dev config
const config = require('./webpack.config.js');

// Remove development server and code map
config.devServer = undefined;
config.devtool = '';
config.mode = 'production';

// Add optimization plugins
config.plugins.push(
  new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  })
);

// Replace development with production config
config.resolve.alias.config = `${__dirname}/config.dev.js`;

module.exports = config;
