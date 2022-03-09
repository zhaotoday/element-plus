export default {
  path: ":menu/products",
  component: () => import("@/views/products/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/products/list/index.vue"),
    },
  ],
};
