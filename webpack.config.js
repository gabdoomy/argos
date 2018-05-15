var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client-side/main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },
    devServer: {
      proxy: {
        '/api':  {
          target: "http://localhost:8081",
          secure: false
        }
      }
    }
};
