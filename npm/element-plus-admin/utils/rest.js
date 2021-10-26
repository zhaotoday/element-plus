import $Rest from "jt-rest";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export class Rest extends $Rest {
  showLoading() {
    NProgress.start();
  }

  hideLoading() {
    NProgress.done();
  }

  toString(obj) {
    const ret = {};

    Object.keys(obj).forEach((attribute) => {
      ret[attribute] = {};

      Object.keys(obj[attribute]).forEach((operator) => {
        if (
          obj[attribute][operator] === undefined ||
          obj[attribute][operator] === ""
        ) {
          delete ret[attribute];
        } else if (operator === "$like") {
          ret[attribute][operator] = `%${obj[attribute][operator]}%`;
        } else {
          ret[attribute] = obj[attribute];
        }
      });
    });

    return JSON.stringify(ret);
  }

  request(
    method = "GET",
    {
      id,
      query = {},
      body = {},
      action = "",
      showLoading = true,
      showError = true,
    }
  ) {
    if (action) {
      this.addPath(`actions/${action}`);
    }

    if (query.where) {
      query.where = this.toString(query.where);
    }

    ["include", "order", "attributes"].forEach((key) => {
      if (query[key]) {
        query[key] = JSON.stringify(query[key]);
      }
    });

    if (method === "GET") {
      query._ = new Date().getTime();
    }

    showLoading && this.showLoading();

    return new Promise((resolve, reject) => {
      super
        .request(method, { id, query, body })
        .then(async ({ data: { data } }) => {
          showLoading && this.hideLoading();

          resolve(data);
        })
        .catch(async ({ response: { status, data } }) => {
          showLoading && this.hideLoading();

          if (status === 401) {
            window.location.href = "/#/logout";
          } else {
            showError && ElMessage.error(data.error || "服务器内部错误");
          }

          reject(data);
        });
    });
  }
}
