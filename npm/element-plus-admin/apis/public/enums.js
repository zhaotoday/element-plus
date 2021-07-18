import { Rest } from "../../utils/rest";
import { useConsts } from "@/composables/use-consts";

export class PublicEnumsApi extends Rest {
  constructor() {
    super();

    this.baseUrl = useConsts().ApiUrl;
    this.path = "public/dicts";
  }
}
