// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/utils/init'
import store from '@/store'
import iView from 'iview'
import './theme/global/iview/index.less'

Vue.config.productionTip = false

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
