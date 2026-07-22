export const researchesRoute = {
  path: ":menu/researches-:path",
  component: () => import("@/views/researches/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/researches/list/index.vue"),
    },
  ],
};
