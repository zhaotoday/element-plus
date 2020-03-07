import helpers from "jt-helpers";
import dayjs from "dayjs";
import consts from "@/utils/consts";

export default {
  ...helpers,
  goBack() {
    window.history.go(-1);
  },
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  getFileURLById(id) {
    return `${consts.BASE_URL}/public/files/${id}`;
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
  },
  getOption(options, value) {
    return options.find(item => item.value === value) || {};
  },
  getOrderRoute({ alias = "orders", status, wxUserId }) {
    const listSearchWhere = encodeURIComponent(
      JSON.stringify({
        no: { $like: "" },
        payWay: { $eq: "" },
        status: status ? { $eq: status } : "",
        wxUserId: { $eq: wxUserId || "" },
        startTime: {
          $eq: dayjs()
            .add(-1, "day")
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss")
        },
        endTime: {
          $eq: dayjs()
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss")
        }
      })
    );

    return `/${alias}/orders/index?listSearchWhere=${listSearchWhere}`;
  }
};
