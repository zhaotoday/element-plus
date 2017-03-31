const webpackConfig = require('../../webpack/test')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'specs/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'specs/**/*.spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpackServer: {
      noInfo: true
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter'
    ],
    webpack: webpackConfig,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage', subdir: '.'},
        {type: 'text-summary', dir: 'coverage', subdir: '.'}
      ]
    },
    concurrency: Infinity
  })
}
