import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const researchesApi = createApi({
  url: "/admin/researches",
  headers: useAuth().getHeaders,
});
