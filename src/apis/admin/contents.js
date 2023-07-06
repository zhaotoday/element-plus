import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const contentsApi = createApi({
  url: "/admin/contents",
  headers: useAuth().getHeaders,
});
