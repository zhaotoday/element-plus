import { RouterView } from "vue-router";

export const productsRoute = {
  path: ":menu/products",
  component: <RouterView />,
  children: [
    {
      path: "",
      component: () => import("@/views/products/list/index.vue"),
    },
  ],
};
