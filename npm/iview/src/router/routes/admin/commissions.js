export default {
  path: ":alias/commissions",
  component: resolve => require(["@/views/commissions"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/commissions/list"], resolve)
    }
  ]
};
