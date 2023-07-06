import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const articlesApi = createApi({
  url: "/admin/articles",
  headers: useAuth().getHeaders,
});
