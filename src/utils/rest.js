import REST from 'jt-rest'
import ViewUI from 'view-design'
import auth from 'view-ui-admin/src/utils/auth'
import dayjs from 'dayjs'

export default class extends REST {
  _toString(obj) {
    let ret = {};
    let types = [];

    Object.keys(obj).forEach(v => {
      types = Object.keys(obj[v]);

      if (types.length) {
        ret[v] = {};

        types.forEach(type => {
          if (obj[v][type] === undefined || obj[v][type] === "") {
            delete ret[v];
          } else if (type === "$like") {
            ret[v][type] = `%${obj[v][type]}%`;
          } else {
            ret[v] = obj[v];
          }
        });
      } else {
        if (
          typeof obj[v] !== "object" &&
          obj[v] !== undefined &&
          obj[v] !== "" &&
          obj[v] !== 0
        ) {
          ret[v] = obj[v];
        }
      }
    });

    return JSON.stringify(ret);
  }

  _getDateRange(query) {
    if (query.where && query.where.dateRange && query.where.dateRange.$eq) {
      const [date1 = "", date2 = ""] = query.where.dateRange.$eq;

      query.where.createdAt = {};

      if (date1) {
        query.where.createdAt.$gt = dayjs(date1).startOf("day").$d;
      }
      if (date2) {
        query.where.createdAt.$lt = dayjs(date2).endOf("day").$d;
      }

      delete query.where.dateRange;
    }
  }

  request(
    method = "GET",
    { id, query = {}, body = {}, showLoading = false, showError = true }
  ) {
    this._getDateRange(query);
    const WhereBlacklist = ["schools", "files", "wxUsers"];
    const schoolId = auth.loggedIn() ? auth.get()["user"].school.id : 0;
    const schoolWhere =
      auth.loggedIn() && WhereBlacklist.includes(this.path)
        ? {}
        : { schoolId: { $eq: schoolId } };

    query.where = this._toString({ ...schoolWhere, ...query.where });

    body.schoolId = schoolId;

    if (query.include) {
      query.include = JSON.stringify(query.include);
    }

    if (query.order) {
      query.order = JSON.stringify(query.order);
    }

    if (method === "GET") {
      query._ = new Date().getTime();
    }

    showLoading && ViewUI.Spin.show();

    return new Promise((resolve, reject) => {
      super
        .request(method, { id, query, body })
        .then(res => {
          showLoading && ViewUI.Spin.hide();
          resolve(res.data);
        })
        .catch(({ response: res }) => {
          showLoading && ViewUI.Spin.hide();

          if (res.status === 401) {
            ViewUI.Message.error("登入过期，请重新登入");
            window.location.href = "index.html#/logout";
          } else {
            if (showError) {
              if (res.status === 500) {
                ViewUI.Message.error("服务器出错");
              } else {
                ViewUI.Message.error(res.data.error.message);
              }
            } else {
              reject(res.data.error);
            }
          }
        });
    });
  }
}
