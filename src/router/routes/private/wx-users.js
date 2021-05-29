export default {
  path: "wx-users",
  component: () => import("@/views/wx-users"),
  children: [
    {
      path: "list",
      component: () => import("@/views/wx-users/list"),
    },
  ],
};
