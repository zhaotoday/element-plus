import { Rest } from "@/utils/rest";
import { consts } from "@/utils/consts";

export class ManagersApi extends Rest {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.path = "public/managers";
  }
}
