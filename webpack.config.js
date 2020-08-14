const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { loadableTransformer } = require('loadable-ts-transformer');
const LoadablePlugin = require('@loadable/webpack-plugin');

// Small trick to have Webpack IntelliSense in VSCode
/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src', 'frontend', 'index.tsx'),
  },
  output: {
    filename: 'main.js',
    chunkFilename: '[contenthash].js',
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
              transpileOnly: true,
              configFile: path.resolve(__dirname, 'tsconfig.webpack.json'),
              getCustomTransformers: () => ({ before: [loadableTransformer] }),
            },
          },
        ],
        exclude: '/node_modules/',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]',
          },
        },
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'frontend', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[contenthash].css',
    }),
    new LoadablePlugin(),
  ],
};
