import { Rest } from "element-plus-admin/utils/rest";
import { getRequestHeaders } from "element-plus-admin/utils/auth";
import { useConsts } from "@/composables/use-consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
