import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const usersApi = createApi({
  url: "/admin/users",
  getHeaders: useAuth().getHeaders,
});
