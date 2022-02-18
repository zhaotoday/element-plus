import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "@/composables/use-auth";

export const aliCloudOssApi = createApi({
  url: "/admin/aliCloudOss",
  headers: useAuth().getHeaders(),
});
