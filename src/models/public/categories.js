import REST from "view-ui-admin/src/utils/rest";
import consts from "@/utils/consts";

export default class extends REST {
  constructor() {
    super();

    this.baseURL = consts.PublicApiUrl;
    this.path = "categories";
  }
}
