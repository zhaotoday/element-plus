import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/app/Root'
import Layout from '@/app/Layout'
import home from './home'
import articles from './articles'
import login from './login'

Vue.use(Router)

export default new Router({
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
            articles
          ]
        },
        login
      ]
    }
  ]
})
