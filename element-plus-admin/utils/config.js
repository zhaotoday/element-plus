import time from "jt-time";
import { consts } from "@/utils/consts";
import { enums } from "@/utils/enums";
import { helpers } from "@/utils/helpers";

export const config = (app) => {
  app.config.globalProperties.$time = time;
  app.config.globalProperties.$consts = consts;
  app.config.globalProperties.$enums = enums;
  app.config.globalProperties.$helpers = helpers;
};
