import { RouterView } from "vue-router";

export default {
  path: ":menu/ads",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/ads/list/index.vue"),
    },
  ],
};
