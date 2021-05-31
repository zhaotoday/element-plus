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
    { id, query = {}, body = {}, showLoading = true, showError = true }
  ) {
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
