const config = require('./utils/base.config')
const consts = require('./utils/consts')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: [
    path.resolve(consts.ENTRY)
  ],
  output: {
    path: path.resolve(consts.DIST),
    publicPath: consts.CDN,
    filename: '[id].[chunkhash].js'
  },
  performance: config.performance,
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve('node_modules')
        ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
          publicPath: '../'
        })
      },
      {
        test: /\.less/,
        include: [
          path.resolve('node_modules')
        ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!less-loader',
          publicPath: '../'
        })
      },
      ...config.module.rules
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      sourceMap: false
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: false
    }),
    ...config.plugins
  ],
  resolve: config.resolve
}
