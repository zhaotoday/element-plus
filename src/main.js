import Vue from "vue";
import "view-ui-admin/src/utils/class-component-hooks";
import App from "./app.vue";
import router from "./router";
import store from "./store";

import ViewUI from "view-design";
import "view-ui-admin/src/utils/register-components";
import globalPlugin from "./plugins/global";
import "view-ui-admin/src/utils/polyfills";
import "./utils/styles";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(globalPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
