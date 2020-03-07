import REST from "jt-rest";
import auth from "./auth";
import ViewUI from "view-design";

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

  request(
    method = "GET",
    { id, query = {}, body = {}, showLoading = false, showError = true }
  ) {
    if (auth.loggedIn()) {
      const userId = auth.get()["user"]["id"];

      query.wxUserId = userId;
      body.wxUserId = userId;
    }

    if (query.where) {
      query.where = this._toString(query.where);
    }

    if (query.include) {
      query.include = JSON.stringify(query.include);
    }

    if (method === "GET") {
      query._ = new Date().getTime();
    }

    showLoading && ViewUI.Spin.show();

    return new Promise(resolve => {
      super
        .request(method, { id, query, body })
        .then(res => {
          showLoading && ViewUI.Spin.hide();
          resolve(res.data);
        })
        .catch(({ response: res }) => {
          showLoading && ViewUI.Spin.hide();

          if (res.status === 500) {
            showError && ViewUI.Message.error("服务器出错");
          } else if (res.status === 401) {
            ViewUI.Message.error("登入过期，请重新登入");
            window.location.href = "index.html#/logout";
          } else {
            showError && ViewUI.Message.error(res.data.error.message);
          }
        });
    });
  }
}
