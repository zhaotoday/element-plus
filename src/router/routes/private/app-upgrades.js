export default {
  path: ":menu/appUpgrades",
  component: () => import("@/views/appUpgrades/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/appUpgrades/list/index.vue"),
    },
  ],
};
