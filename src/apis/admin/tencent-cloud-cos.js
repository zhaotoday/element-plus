import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const tencentCloudCosApi = createApi({
  url: "/admin/tencentCloudCos",
  headers: useAuth().getHeaders(),
});
