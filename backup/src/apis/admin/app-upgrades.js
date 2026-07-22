import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const appUpgradesApi = createApi({
  url: "/admin/appUpgrades",
  headers: useAuth().getHeaders,
});
