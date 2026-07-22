export const contentRoute = {
  path: ":menu/contents-:path",
  component: () => import("@/views/contents/index.vue"),
};
