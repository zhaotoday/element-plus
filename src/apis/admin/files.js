import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const filesApi = createApi({
  url: "/admin/files",
  getHeaders: useAuth().getHeaders,
});
