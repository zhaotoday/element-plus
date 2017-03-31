const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const consts = require('./consts')
const path = require('path')

const config = {
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve('src/themes')],
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve('src/app'),
          path.resolve('src/components')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('src/themes')]
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          require('postcss-font-magician')(),
          require('cssnano')({
            filterPlugins: false,
            sourcemap: true,
            autoprefixer: {
              add: true,
              remove: true,
              browserslist: ['last 2 versions']
            },
            safe: true,
            discardComments: {
              removeAll: true
            }
          })
        ]
      }
    }),
    new HtmlWebpackPlugin({
      template: consts.TEMPLATE,
      title: consts.TITLE,
      filename: (consts.ENV === 'prod' ? '.' : '') + './index.html',
      hash: true
    })
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.html', '.css', '.scss'],
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
  }
}

module.exports = config
