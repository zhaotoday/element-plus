import { Rest } from "@/utils/rest";
import { consts } from "@/utils/consts";
import { getRequestHeaders } from "@/utils/auth";

export class WxUsersModel extends Rest {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
