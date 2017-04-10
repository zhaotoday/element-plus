import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import Root from '@/app/Root'
import Layout from '@/app/Layout'
import notFound from './notFound'
import home from './home'
import articles from './articles'
import login from './login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/',
          component: Layout,
          children: [
            home,
            articles,
            notFound
          ],
          meta: {
            requiresAuth: true
          }
        },
        login
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
