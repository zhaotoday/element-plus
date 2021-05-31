import { Rest } from "element-plus-admin/utils/rest";
import { getRequestHeaders } from "element-plus-admin/utils/auth";
import { consts } from "@/utils/consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
