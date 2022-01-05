import { createApi } from "../../utils/create-api";

export const publicManagersApi = createApi({
  requiresAuth: false,
  url: "/public/managers",
});
