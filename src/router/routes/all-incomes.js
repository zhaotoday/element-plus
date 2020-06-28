export default {
  path: ":alias/all-incomes",
  component: resolve => require(["@/views/all-incomes"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/all-incomes/list"], resolve)
    }
  ]
};
