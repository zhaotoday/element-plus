import { RouterView } from "vue-router";

export const usersRoute = {
  path: ":menu/users",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/users/list/index.vue"),
    },
  ],
};
