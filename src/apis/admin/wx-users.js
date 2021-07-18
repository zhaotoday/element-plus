import { Rest } from "element-plus-admin/utils/rest";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { useConsts } from "@/composables/use-consts";

export class WxUsersApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.headers = useAuth().getRequestHeaders();
    this.path = "admin/wxUsers";
  }
}
