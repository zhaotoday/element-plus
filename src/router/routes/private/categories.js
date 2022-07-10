import { RouterView } from "vue-router";

export default {
  path: ":menu/categories",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/categories/list/index.vue"),
    },
  ],
};
