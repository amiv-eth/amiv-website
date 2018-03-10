const config = {
  context: `${__dirname}/src`, // `__dirname` is root of project and `src` is source

  entry: './index.js',

  output: {
    path: `${__dirname}/dist`, // `dist` is the destination
    filename: 'bundle.js',
  },

  // To run development server
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist',
    compress: true,
    port: 9000,
    hot: true,
    index: 'index.html',
  },

  module: {
    rules: [
      {
        test: /\.js$/, // Check for all js files
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env'] },
        }],
      },
      {
        test: /\.md$/, // Check for all md files
        use: [
          {
            loader: 'file-loader', // Writes the generated HTML to a file
            options: {
              name: '[name].html',
              outputPath: 'companies',
              publicPath: '/dist/companies',
            },
          },
          {
            loader: 'markdown-loader', // Converts Markdown to HTML
          },
        ],
      },
    ],
  },

  devtool: 'eval-source-map', // Default development sourcemap
};

module.exports = config;
