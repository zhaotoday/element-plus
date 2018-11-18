import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import globalPlugin from '@/plugins/global'
import '@/utils/init'
import '@/utils/styles'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(globalPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
