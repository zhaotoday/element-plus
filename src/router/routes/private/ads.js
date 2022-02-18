export default {
  path: ":menu/ads",
  component: () => import("@/views/ads/index.vue"),
  children: [
    {
      path: "list",
      component: () => import("@/views/ads/list/index.vue"),
    },
  ],
};
