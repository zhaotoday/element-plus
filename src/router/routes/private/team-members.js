export default {
  path: ":menu/team-members-:path",
  component: () => import("@/views/team-members/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/team-members/list/index.vue"),
    },
  ],
};
