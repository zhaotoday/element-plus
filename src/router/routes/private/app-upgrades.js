export default {
  path: ":menu/app-upgrades",
  component: () => import("@/views/app-upgrades/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/app-upgrades/list/index.vue"),
    },
  ],
};
