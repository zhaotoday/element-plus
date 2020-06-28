import helpers from "jt-helpers";
import consts from "@/utils/consts";

export default {
  ...helpers,
  goBack() {
    window.history.go(-1);
  },
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  getFileUrlById(id) {
    return `${consts.BaseUrl}/public/files/${id}`;
  },
  getItemById(items, id) {
    return items && items.length
      ? items.find(item => +item.id === +id) || {}
      : {};
  },
  getItem(items, key, val) {
    return items && items.length
      ? items.find(item => item[key] === val) || {}
      : {};
  }
};
