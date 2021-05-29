import time from "jt-time";
import auth from "view-ui-admin/src/utils/auth";
import DictsMixin from "view-ui-admin/src/mixins/dicts";
import consts from "@/utils/consts";
import helpers from "@/utils/helpers";
import GlobalMixin from "@/mixins/global";
import ProductSelect from "@/components/product-select";

export default {
  install(Vue) {
    Vue.prototype.$time = time;
    Vue.prototype.$auth = auth;
    Vue.prototype.$consts = consts;
    Vue.prototype.$helpers = helpers;

    Vue.filter("time", val => time.getTime(val));
    Vue.filter("date", val => time.getDate(val));
    Vue.filter("itemById", (items, id) => helpers.getItemById(items, id));

    Vue.mixin(GlobalMixin);
    Vue.mixin(DictsMixin);

    Vue.component("c-product-select", ProductSelect);
  }
};
