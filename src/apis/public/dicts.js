import { createApi } from "@/utils/request";

export const dictsApi = createApi({
  requiresAuth: false,
  path: "/public/dicts",
});
