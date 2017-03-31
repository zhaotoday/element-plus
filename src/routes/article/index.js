export default {
  path: 'article',
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/article').default)
    })
  },
  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('app/article/list').default
      })
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./add').default
      ])
    })
  }
}
