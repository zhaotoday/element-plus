import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import TheLayout from '@/components/layout'
import Root from '@/views/root'
import iView from 'iview'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          component: TheLayout,
          children: [
            require('./routes/home').default,
            require('./routes/articles').default,
            require('./routes/products').default,
            require('./routes/orders').default,
            require('./routes/ads').default,
            require('./routes/helpers').default,
            require('./routes/wx-users').default,
            require('./routes/comments').default,
            require('./routes/coupons').default,
            require('./routes/coupon-activities').default,
            require('./routes/rbac').default,
            require('./routes/settings').default,
            require('./routes/logs').default,
            require('./routes/modify-password').default,
            require('./routes/surveys').default,
            require('./routes/activities').default,
            require('./routes/freights').default,
            require('./routes/suppliers').default,
            require('./routes/merchants').default
          ],
          meta: {
            requiresAuth: true
          }
        },
        require('./routes/login').default,
        require('./routes/logout').default,
        require('./routes/not-found').default
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

export default router
