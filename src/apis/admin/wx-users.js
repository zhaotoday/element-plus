import { Rest } from "@/utils/rest";
import { getRequestHeaders } from "@/utils/auth";
import { consts } from "@/utils/consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = consts.ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
