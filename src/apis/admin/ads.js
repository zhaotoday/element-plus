import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const adsApi = createApi({
  url: "/admin/ads",
  getHeaders: useAuth().getHeaders,
});
