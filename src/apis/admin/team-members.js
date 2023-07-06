import { createApi } from "element-plus-admin/utils/create-api";
import { useAuth } from "element-plus-admin/composables/use-auth";

export const teamMembersApi = createApi({
  url: "/admin/teamMembers",
  headers: useAuth().getHeaders(),
});
