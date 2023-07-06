export default {
  path: ":menu/research-areas-:path",
  component: () => import("@/views/research-areas/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/research-areas/list/index.vue"),
    },
  ],
};
