import $Rest from "jt-rest";
import { ElMessage } from "element-plus";
import { router } from "@/router";
import { logout } from "./auth";
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
          if (status === 401) {
            logout();
            await router.push("/login");
          } else {
            showError && ElMessage.error(data.error || "服务器内部错误");
            showLoading && this.hideLoading();
          }

          reject(data);
        });
    });
  }
}
