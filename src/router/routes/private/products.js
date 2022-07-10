export default {
  path: ":menu/products",
  component: <router-view />,
  children: [
    {
      path: "",
      component: () => import("@/views/products/list/index.vue"),
    },
  ],
};
