import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const researchAreasApi = createApi({
  url: "/admin/researchAreas",
  headers: useAuth().getHeaders,
});
