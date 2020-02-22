import time from "jt-time";
import consts from "../utils/consts";
import helpers from "../utils/helpers/base";
import auth from "../utils/auth";
import globalMixin from "../mixins/global";
import List, {
  ListHeader,
  ListOperations,
  ListSearch,
  ListNavigation
} from "../components/list";
import CCategories from "../components/categories";
import CEditor from "../components/editor";
import CUploader from "../components/uploader";
import CDropdown from "../components/dropdown";
import CDelete from "../components/delete";
import CBulkDelete from "../components/bulk-delete";
import CWXUserInfo from "../components/wx-user-info";
import CWxUserSelect from "../components/wx-user-select";

export default {
  install(Vue) {
    Vue.prototype.$time = time;
    Vue.prototype.$consts = consts;
    Vue.prototype.$helpers = helpers;
    Vue.prototype.$auth = auth;

    Vue.filter("time", val => time.getTime(val));
    Vue.filter("date", val => time.getDate(val));
    Vue.filter("itemById", (items, id) => helpers.getItemById(items, id));

    Vue.mixin(globalMixin);

    Vue.component("c-list", List);
    Vue.component("c-list-header", ListHeader);
    Vue.component("c-list-operations", ListOperations);
    Vue.component("c-list-search", ListSearch);
    Vue.component("c-list-navigation", ListNavigation);
    Vue.component("c-categories", CCategories);
    Vue.component("CEditor", CEditor);
    Vue.component("CUploader", CUploader);
    Vue.component("CDropdown", CDropdown);
    Vue.component("CDelete", CDelete);
    Vue.component("CBulkDelete", CBulkDelete);
    Vue.component("CWXUserInfo", CWXUserInfo);
    Vue.component("CWxUserSelect", CWxUserSelect);
  }
};
