'use strict';

const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    hashDigestLength: helpers.hashDigestLength,
    filename: '[name].[hash].js',
    // chunkFilename: '[id].[hash].chunk.js'
  },

  optimization: {
    noEmitOnErrors: true,
    // splitChunks: {
    //   chunks: 'all'
    // },
    splitChunks: false,
    // runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        canPrint: false
      })
    ]
  }
});
