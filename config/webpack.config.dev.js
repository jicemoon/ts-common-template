'use strict';

const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  optimization: {
    noEmitOnErrors: true
  },

  devServer: {
    contentBase: helpers.root('dist'),
    historyApiFallback: true,
    publicPath: '/',
    stats: 'minimal'
  }
});
