import { Rest } from "element-plus-admin/utils/rest";
import { consts } from "@/utils/consts";

export class PublicManagersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.path = "public/managers";
  }
}
