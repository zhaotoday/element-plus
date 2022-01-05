import { createApi } from "../../utils/create-api";

export const managersApi = createApi({
  requiresAuth: false,
  url: "/public/managers",
});
