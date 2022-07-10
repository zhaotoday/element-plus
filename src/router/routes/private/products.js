import { RouterView } from "vue-router";

export default {
  path: ":menu/products",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/products/list/index.vue"),
    },
  ],
};
