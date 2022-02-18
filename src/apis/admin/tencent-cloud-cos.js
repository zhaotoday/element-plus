import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "@/composables/use-auth";

export const tencentCloudCosApi = createApi({
  url: "/admin/tencentCloudCos",
  headers: useAuth().getHeaders(),
});
