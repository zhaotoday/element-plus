import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/app/Root'
import Layout from '@/app/Layout'

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
            {
              path: '/',
              component: resolve => require(['@/app/Home'], resolve)
            },
            {
              path: 'articles',
              component: resolve => require(['@/app/Articles'], resolve),
              children: [
                {
                  path: '/',
                  component: resolve => require(['@/app/Articles/List'], resolve)
                },
                {
                  path: 'form',
                  component: resolve => require(['@/app/Articles/Form'], resolve)
                }
              ]
            }
          ]
        },
        {
          path: 'login',
          component: resolve => require(['@/app/Login'], resolve)
        }
      ]
    }
  ]
})
