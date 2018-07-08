const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: ['babel-polyfill', './index.js'],

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
  },

  // To run development server
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html',
    historyApiFallback: {
      index: 'index.html',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: [['env', { targets: 'last 2 years' }]] },
          },
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
              publicPath: 'dist/companies/',
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
              publicPath: 'dist/companies/',
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
              publicPath: 'dist/amiv/',
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
              publicPath: 'dist/amiv/',
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
              publicPath: 'dist/amiv/',
            },
          },
        ],
      },
      {
        test: /src\/images\/[a-zA-Z\d\/]+\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: '/',
              publicPath: 'dist/',
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

  // Dynamically include config
  resolve: {
    alias: {
      config: `${__dirname}/config.js`,
    },
  },

  devtool: 'eval-source-map', // Default development sourcemap
};

module.exports = config;
