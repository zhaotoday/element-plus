import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const productsApi = createApi({
  url: "/admin/products",
  headers: useAuth().getHeaders,
});
