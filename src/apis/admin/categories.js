import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const categoriesApi = createApi({
  url: "/admin/categories",
  headers: useAuth().getHeaders(),
});
