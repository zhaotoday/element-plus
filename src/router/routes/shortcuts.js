export default {
  path: ":alias/shortcuts",
  component: resolve => require(["@/views/shortcuts"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/shortcuts/list"], resolve)
    }
  ]
};
