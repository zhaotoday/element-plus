import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import "./utils/class-component-hooks";

import ViewUI from "view-design";
import globalPlugin from "@/plugins/global";
import "@/utils/init";
import "@/utils/styles";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(globalPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
