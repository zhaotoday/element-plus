import { Rest } from "@/utils/rest";
import { consts } from "@/utils/consts";
import { getRequestHeaders } from "@/utils/auth";

export class QuestionsModel extends Rest {
  constructor() {
    super();

    this.baseURL = consts.ApiUrl;
    this.headers = getRequestHeaders();
    this.path = "admin/questions";
  }
}
