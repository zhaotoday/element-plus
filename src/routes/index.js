import auth from 'utils/auth'

export default {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('app').default,
    onEnter(nextState, replace) {
      if (!auth.isLogin()) {
        replace({
          pathname: '/login',
          state: {
            nextPathname: nextState.location.pathname
          }
        })
      }
    },
    getIndexRoute(location, callback) {
      require.ensure([], function (require) {
        callback(null, {
          component: require('app/dashboard').default
        })
      })
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./article').default
        ])
      })
    }
  }, {
    path: 'login',
    component: require('app/login').default,
    onEnter(nextState, replace) {
      if (auth.isLogin()) {
        replace('/')
      }
    }
  }]
}
