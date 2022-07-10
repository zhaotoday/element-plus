import { RouterView } from "vue-router";

export const appUpgradesRoute = {
  path: ":menu/app-upgrades",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/app-upgrades/list/index.vue"),
    },
  ],
};
