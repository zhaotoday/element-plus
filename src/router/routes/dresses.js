export default {
  path: ":alias/dresses",
  component: resolve => require(["@/views/dresses"], resolve),
  children: [
    {
      path: "home",
      component: resolve => require(["@/views/dresses/home"], resolve)
    },
    {
      path: "templates",
      component: resolve => require(["@/views/dresses/templates"], resolve)
    }
  ]
};
