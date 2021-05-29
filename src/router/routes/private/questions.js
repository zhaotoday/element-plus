export default {
  path: "questions",
  component: () => import("@/views/questions"),
  children: [
    {
      path: "list",
      component: () => import("@/views/questions/list")
    }
  ]
};
