import REST from "view-ui-admin/src/utils/rest";
import auth from "view-ui-admin/src/utils/auth";
import consts from "@/utils/consts";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.headers = auth.getHeaders();
    this.path = "managers";
  }
}
