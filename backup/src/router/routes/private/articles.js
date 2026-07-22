export const articlesRoute = {
  path: ":menu/articles-:path",
  component: () => import("@/views/articles/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/articles/list/index.vue"),
    },
  ],
};
