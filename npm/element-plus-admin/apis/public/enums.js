import { createApi } from "../../utils/create-api";

export const publicEnumsApi = createApi({
  requiresAuth: false,
  url: "/public/dicts",
});
