export default {
  path: ":alias/entries",
  component: resolve => require(["@/views/entries"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/entries/list"], resolve)
    }
  ]
};
