import time from "jt-time";
import { useConsts } from "@/composables/use-consts";
import { useHelpers } from "@/composables/use-helpers";

export const config = (app) => {
  app.config.globalProperties.$time = time;
  app.config.globalProperties.$consts = useConsts();
  app.config.globalProperties.$helpers = useHelpers();
};
