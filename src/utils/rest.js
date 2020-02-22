import REST from "jt-rest";
import ViewUI from "view-design";
import restHelpers from "./helpers/rest-helpers";

export default class extends REST {
  /**
   * 重写父类 request 方法，按业务场景定制功能
   * @override
   */
  request(method = "GET", options = {}) {
    if (!options.query) {
      options.query = {};
    }

    // 转 options.query.where 对象为字符串
    if (options.query.where) {
      options.query.where = restHelpers.whereToStr(options.query.where);
    }

    if (method === "GET") {
      options.query._ = new Date().getTime();
    }

    ViewUI.Spin.show();

    return new Promise(resolve => {
      super
        .request(method, options)
        .then(res => {
          ViewUI.Spin.hide();
          // 在这里可对 res 进行包装
          resolve(res.data);
        })
        .catch(res => {
          ViewUI.Spin.hide();

          if (res.response.data.error.code === "AUTHORIZATION/UNAUTHORIZED") {
            ViewUI.Message.error("登入过期，请重新登入");
            window.location.href = "index.html#/logout";
          } else {
            ViewUI.Message.error(res.response.data.error.message);
          }
        });
    });
  }
}
