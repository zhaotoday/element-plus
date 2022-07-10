import { RouterView } from "vue-router";

export default {
  path: ":menu/app-upgrades",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/app-upgrades/list/index.vue"),
    },
  ],
};
