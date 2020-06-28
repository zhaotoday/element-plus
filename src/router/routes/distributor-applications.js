export default {
  path: ":alias/distributor-applications",
  component: resolve => require(["@/views/distributor-applications"], resolve),
  children: [
    {
      path: "list",
      component: resolve =>
        require(["@/views/distributor-applications/list"], resolve)
    }
  ]
};
