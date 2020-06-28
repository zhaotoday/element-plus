export default {
  path: ":alias/schoolWxUsers",
  component: resolve => require(["@/views/school-wx-users"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/school-wx-users/list"], resolve)
    }
  ]
};
