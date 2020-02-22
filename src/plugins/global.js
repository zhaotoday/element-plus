import time from "jt-time";
import consts from "../utils/consts";
import helpers from "../utils/helpers/base";
import auth from "../utils/auth";
import globalMixin from "../mixins/global";
import CList, {
  CListHeader,
  CListOperations,
  CListSearch,
  CListNavigation
} from "../components/list";
import CCategories from "../components/categories";
import CEditor from "../components/editor";
import CUploader from "../components/uploader";
import CDropdown from "../components/dropdown";
import CDel from "../components/del";
import CBatchDel from "../components/batch-del";
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

    Vue.component("CList", CList);
    Vue.component("CListHeader", CListHeader);
    Vue.component("CListOperations", CListOperations);
    Vue.component("CListSearch", CListSearch);
    Vue.component("CListNavigation", CListNavigation);
    Vue.component("CCategories", CCategories);
    Vue.component("CEditor", CEditor);
    Vue.component("CUploader", CUploader);
    Vue.component("CDropdown", CDropdown);
    Vue.component("CDel", CDel);
    Vue.component("CBatchDel", CBatchDel);
    Vue.component("CWXUserInfo", CWXUserInfo);
    Vue.component("CWxUserSelect", CWxUserSelect);
  }
};
