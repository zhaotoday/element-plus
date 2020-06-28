export default {
  path: ":alias/incomes",
  component: resolve => require(["@/views/incomes"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/incomes/list"], resolve)
    }
  ]
};
