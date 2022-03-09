export default {
  path: ":menu/users",
  component: () => import("@/views/users/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/users/list/index.vue"),
    },
  ],
};
