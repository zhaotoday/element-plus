import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const ordersApi = createApi({
  url: "/admin/orders",
  getHeaders: useAuth().getHeaders,
});
