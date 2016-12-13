'use strict';

var path = require('path');
var webpack = require('webpack');
//var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/index',
  ],

  output: {
    path: path.join(__dirname, './'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new OpenBrowserPlugin({ url: 'http://localhost:3000' })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel'],
        include: path.join(__dirname, 'src'),

      },

    ]
  }
};
