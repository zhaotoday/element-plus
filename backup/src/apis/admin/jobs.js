import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const jobsApi = createApi({
  url: "/admin/jobs",
  headers: useAuth().getHeaders,
});
