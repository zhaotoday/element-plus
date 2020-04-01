import time from "jt-time";
import consts from "../utils/consts";
import helpers from "../utils/helpers";
import auth from "../utils/auth";
import GlobalMixin from "../mixins/global";
import DictsMixin from "../mixins/dicts";
import List, {
  ListHeader,
  ListOperations,
  ListSearch,
  ListNavigation
} from "../components/list";
import CategorySelect from "../components/category-select";
import Uploader from "../components/uploader";
import Delete from "../components/delete";
import CBulkDelete from "../components/bulk-delete";
import WxUserInfo from "../components/wx-user-info";
import WxUserSelect from "../components/wx-user-select";
import Icon from "../components/icon";
import Dropdown from "../components/dropdown";
import ListImage from "../components/list-image";
import Editor from "../components/editor";
import PaymentSelect from "../components/payment-select";
import PublishStatusSelect from "../components/publish-status-select";

export default {
  install(Vue) {
    Vue.prototype.$time = time;
    Vue.prototype.$consts = consts;
    Vue.prototype.$helpers = helpers;
    Vue.prototype.$auth = auth;

    Vue.filter("time", val => time.getTime(val));
    Vue.filter("date", val => time.getDate(val));
    Vue.filter("itemById", (items, id) => helpers.getItemById(items, id));

    Vue.mixin(GlobalMixin);
    Vue.mixin(DictsMixin);

    Vue.component("c-list", List);
    Vue.component("c-list-header", ListHeader);
    Vue.component("c-list-operations", ListOperations);
    Vue.component("c-list-search", ListSearch);
    Vue.component("c-list-navigation", ListNavigation);
    Vue.component("c-category-select", CategorySelect);
    Vue.component("c-uploader", Uploader);
    Vue.component("c-delete", Delete);
    Vue.component("c-bulk-delete", CBulkDelete);
    Vue.component("c-wx-user-info", WxUserInfo);
    Vue.component("c-wx-user-select", WxUserSelect);
    Vue.component("c-icon", Icon);
    Vue.component("c-dropdown", Dropdown);
    Vue.component("c-list-image", ListImage);
    Vue.component("c-editor", Editor);
    Vue.component("c-payment-select", PaymentSelect);
    Vue.component("c-publish-status-select", PublishStatusSelect);
  }
};
