export default {
  path: ":alias/schools",
  component: resolve => require(["@/views/schools"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/schools/list"], resolve)
    },
    {
      path: "list/form/:id?",
      component: resolve => require(["@/views/schools/form"], resolve)
    }
  ]
};
