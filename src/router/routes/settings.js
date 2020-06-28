export default {
  path: ":alias/settings",
  component: resolve => require(["@/views/settings"], resolve),
  children: [
    {
      path: "list/form/:id?",
      component: resolve => require(["@/views/settings/form"], resolve)
    }
  ]
};
