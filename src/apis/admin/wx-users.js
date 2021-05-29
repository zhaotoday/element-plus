import { Rest } from "@/utils/rest";
import { consts } from "@/utils/consts";
import { getRequestHeaders } from "@/utils/auth";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
