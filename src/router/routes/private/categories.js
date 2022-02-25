export default {
  path: ":menu/categories",
  component: () => import("@/views/categories/index.vue"),
  children: [
    {
      path: "list",
      component: () => import("@/views/categories/list/index.vue"),
    },
  ],
};
