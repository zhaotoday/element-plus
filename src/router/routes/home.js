import helpers from "@/utils/helpers/base";

export default {
  path: "/",
  component: resolve => require(["@/views/home"], resolve),
  beforeEnter(to, from, next) {
    next(helpers.getOrderRoute({ status: "TO_DELIVER" }));
  }
};
