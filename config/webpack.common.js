const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    js: './docs/assets/js/app.js',
    css: './docs/assets/css/todolist.css',
  },
  plugins: [
    // this plugins is cleaning the dist folder while we make a new build
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // this plugins generate his own index.html with all the connected dependecies js files above
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'docs/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
      },
    ],
  },
  output: {
    // name taking the name of the property on the entry point
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  // permet de dédupliquer les potentielles dépendances qui sont inclus dans chaque module et de les appeler à chaque fois
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

// https://webpack.js.org/guides/asset-management/