const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const path = require('path');

const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: ['@babel/polyfill', './index.js'],

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
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
              presets: [['@babel/preset-env', { targets: 'last 2 years' }]],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        ],
        include: [path.resolve(__dirname, './src')],
      },
      {
        test: /src\/content\/amiv\/markdown\/[a-zA-Z\d-]{3,}\.[a-z]{2}\.md$/, // Check for all .md files in /amiv/markdown
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].[hash].html',
              outputPath: 'assets/amiv/',
              publicPath: 'assets/amiv/',
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
              name: '[name].[hash].html',
              outputPath: 'assets/amiv/',
              publicPath: 'assets/amiv/',
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
              name: '[name].[hash].[ext]',
              outputPath: 'assets/amiv/',
              publicPath: 'assets/amiv/',
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
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
              publicPath: 'assets/images/',
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
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
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

  optimization: {
    usedExports: true,
    sideEffects: true,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      name: true,
    },
  },

  plugins: [
    new RobotstxtPlugin({
      policy: [{ userAgent: '*', allow: '/' }],
    }),
    new WebappWebpackPlugin({
      logo: './images/amivWheel.svg',
      prefix: 'assets/icons-[hash]/',
      title: 'AMIV an der ETH',
      favicons: {
        appName: 'AMIV an der ETH',
        appShortName: 'AMIV',
        appDescription: 'Official Website of «AMIV an der ETH»',
        developerName: 'AMIV an der ETH',
        developerURL: null, // prevent retrieving from the nearest package.json
        background: '#fff',
        theme_color: '#e8462b',
        lang: 'en',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new GenerateSW({
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'images',
            expiration: { maxEntries: 10 }, // Only cache 10 images.
          },
        },
        {
          urlPattern: /\.js$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'scripts',
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'AMIV an der ETH',
      filename: 'index.html',
      template: 'index.html',
    }),
    new HtmlWebpackInlineSVGPlugin(),
  ],
};

module.exports = config;
