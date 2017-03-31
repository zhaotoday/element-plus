export default {
  path: 'add',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('app/article/add').default)
    })
  }
}
