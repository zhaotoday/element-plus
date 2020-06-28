import REST from "view-ui-admin/src/utils/rest";
import consts from "@/utils/consts";
import auth from "view-ui-admin/src/utils/auth";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "products";
  }
}
