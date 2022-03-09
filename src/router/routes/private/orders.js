export default {
  path: ":menu/orders",
  component: () => import("@/views/orders/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/orders/list/index.vue"),
    },
  ],
};
