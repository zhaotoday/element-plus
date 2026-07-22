import { Enum } from "enum-plus";

/**
 * 微信登录类型枚举
 */
export const WxLoginType = Enum({
  MP: { value: "mp", label: "小程序" },
  OA: { value: "oa", label: "公众号" },
  APP: { value: "app", label: "APP" },
  WEB: { value: "web", label: "WEB" },
});
