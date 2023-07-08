import { RouterView } from "vue-router";

export const jobsRoute = {
  path: ":menu/jobs",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/jobs/list/index.vue"),
    },
  ],
};
