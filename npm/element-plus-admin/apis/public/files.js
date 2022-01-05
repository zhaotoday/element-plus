import { createApi } from "../../utils/create-api";

export const publicFilesApi = createApi({
  requiresAuth: false,
  url: "/public/files",
});
