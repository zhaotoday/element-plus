export default {
  path: ":menu/ads",
  component: () => import("@/views/ads/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/ads/list/index.vue"),
    },
  ],
};
