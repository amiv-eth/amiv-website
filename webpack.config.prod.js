const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: './index.js',

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] },
          },
        ],
      },
      {
        test: /src\/views\/companies\/markdown\/[a-zA-Z\d-]{3,}\.[a-z]{2}\.md$/, // Check for all .md files in /companies/markdown
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'companies/',
              publicPath: 'dist/companies/',
            },
          },
          {
            loader: 'markdown-loader', // Converts Markdown to HTML
          },
          {
            loader: 'string-replace-loader', // Adds /#! prefix to local urls
            options: {
              search: '\[(.*)\]\((\/(?!dist).*)\)',
              replace: '(/#!$1',
              flags: 'g',
            },
          },
        ],
      },
      {
        test: /src\/views\/amiv\/markdown\/[a-zA-Z\d-]{3,}\.[a-z]{2}\.md$/, // Check for all .md files in /amiv/markdown
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'amiv/',
              publicPath: 'dist/amiv/',
            },
          },
          {
            loader: 'markdown-loader', // Converts Markdown to HTML
          },
          {
            loader: 'string-replace-loader', // Adds /#! prefix to local urls
            options: {
              search: '\[(.*)\]\((\/(?!dist).*)\)',
              replace: '(/#!$1',
              flags: 'g',
            },
          },
        ],
      },
      {
        test: /src\/views\/amiv\/html\/[a-zA-Z\d-]{3,}\.html$/, // Check for all .html files in /amiv/html
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'amiv/',
              publicPath: 'dist/amiv/',
            },
          },
        ],
      },
      {
        test: /src\/views\/amiv\/images\/[a-zA-Z\d\/]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: 'amiv/',
              publicPath: 'dist/amiv/',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  devtool: '', // No source map for production build
};

module.exports = config;
