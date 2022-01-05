import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const filesApi = createApi({
  headers: useAuth().getHeaders(),
  url: "/admin/files",
});
