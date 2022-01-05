import { createApi } from "@/utils/request";

export const dictsApi = createApi({
  requiresAuth: false,
  url: "/public/dicts",
});
