const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Small trick to have Webpack IntelliSense in VSCode
/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'none',
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'frontend', 'index.tsx'),
  },
  output: {
    chunkFilename: 'chunk-[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.webpack.json'),
            },
          },
        ],
        exclude: '/node_modules/',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'frontend', 'index.html'),
    }),
  ],
};
