'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpers = require('./helpers');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: './src/app/entry.ts',
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        include: helpers.root('src')
      },
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: helpers.root('tsconfig.json')
          }
        }],
        exclude: [/node_modules/]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `./images/[hash:${helpers.hashDigestLength}].[ext]`
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: './css/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './css/fonts/[name].[ext]'
          }
        }
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(
      helpers.root('dist'), {
        root: helpers.root(),
        verbose: true
      }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'html-withimg-loader!src/index.html',
      filename: helpers.root('dist', 'index.html'),
      inject: true
    })
  ]
};
