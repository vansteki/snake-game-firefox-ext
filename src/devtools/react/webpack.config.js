const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const options = {
  // 'host': '127.0.0.1',
  'port': 9999,
  liveReload:true
}

module.exports = {
  // target: 'web',
  entry: [
    'webpack-plugin-serve/client',
    './index.js'
  ],
  'output': {
    'filename': '[name].pack.js'
  },
  'module': {
    'rules': [
      {
        'use': {
          'loader': 'babel-loader',
          'options': {
            'presets': [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        },
        'exclude': /node_modules/,
        'test': /\.js$/
      }
    ]
  },
  mode: 'development',
  plugins: [
    new Serve(options),
    // new HtmlWebpackPlugin({
    //   title: 'snake game - react',
    //   template: 'index.html'
    // })
  ],
  watch: true
}
