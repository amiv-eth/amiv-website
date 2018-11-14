const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const path = require('path');

const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: ['babel-polyfill', './index.js'],

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    publicPath: '/',
    filename: 'bundle.js',
  },

  // To run development server
  devServer: {
    contentBase: `${__dirname}/dist`,
    publicPath: '/',
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html',
    historyApiFallback: true,
  },
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { targets: 'last 2 years' }]],
              plugins: ['transform-object-rest-spread'],
            },
          },
        ],
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, 'node_modules/@material'),
          path.resolve(__dirname, 'node_modules/amiv-web-ui-components'),
        ],
      },
      {
        test: /src\/content\/companies\/markdown\/[a-zA-Z\d-]{3,}\.[a-z]{2}\.md$/, // Check for all .md files in /companies/markdown
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'companies/',
              publicPath: 'companies/',
            },
          },
          {
            loader: 'markdown-loader', // Converts Markdown to HTML
          },
        ],
      },
      {
        test: /src\/content\/companies\/logos\/[-_a-zA-Z\d\/]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'companies/',
              publicPath: 'companies/',
            },
          },
        ],
      },
      {
        test: /src\/content\/amiv\/markdown\/[a-zA-Z\d-]{3,}\.[a-z]{2}\.md$/, // Check for all .md files in /amiv/markdown
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'amiv/',
              publicPath: 'amiv/',
            },
          },
          {
            loader: 'markdown-loader', // Converts Markdown to HTML
          },
        ],
      },
      {
        test: /src\/content\/amiv\/html\/[a-zA-Z\d-]{3,}\.html$/, // Check for all .html files in /amiv/html
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'amiv/',
              publicPath: 'amiv/',
            },
          },
        ],
      },
      {
        test: /src\/content\/amiv\/images\/[a-zA-Z\d\/]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: 'amiv/',
              publicPath: 'amiv/',
            },
          },
        ],
      },
      {
        test: /src\/images\/[a-zA-Z\d\/\-_]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images/',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Dynamically include config
  resolve: {
    alias: {
      config: `${__dirname}/config.js`,
      'polythene-theme': `${__dirname}/theme.js`, // when config is in the project root
    },
  },

  devtool: 'eval-source-map', // Default development sourcemap

  plugins: [
    new FaviconsWebpackPlugin({
      logo: './images/logoNoText.svg',
      prefix: 'favicon/',
      title: 'AMIV an der ETH',
    }),
    new HtmlWebpackPlugin({
      title: 'AMIV an der ETH',
      filename: 'index.html',
      template: 'index.html',
      hash: true,
    }),
    new HtmlWebpackInlineSVGPlugin(),
  ],
};

module.exports = config;
