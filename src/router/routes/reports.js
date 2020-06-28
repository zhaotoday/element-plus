export default {
  path: ":alias/reports",
  component: resolve => require(["@/views/reports"], resolve),
  children: [
    {
      path: "orders",
      component: resolve => require(["@/views/reports/orders"], resolve)
    },
    {
      path: "points",
      component: resolve => require(["@/views/reports/orders"], resolve)
    }
  ]
};
