export default {
  path: "wx-users",
  component: () => import("@/views/wx-users/index.vue"),
  children: [
    {
      path: "list",
      component: () => import("@/views/wx-users/list/index.vue"),
    },
  ],
};
