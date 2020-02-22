import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";

import ViewUI from "view-design";
import globalPlugin from "@/plugins/global";
import "@/utils/init";
import "@/utils/styles";

import iviewArea from "iview-area";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(globalPlugin);
Vue.use(iviewArea);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
