import { createApi } from "../../utils/create-api";

export const enumsApi = createApi({
  requiresAuth: false,
  url: "/public/dicts",
});
