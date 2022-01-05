import { createApi } from "../../utils/create-api";

export const filesApi = createApi({
  requiresAuth: false,
  url: "/public/files",
});
