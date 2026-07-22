import { Enum } from "enum-plus";

/**
 * 性别枚举
 */
export const Gender = Enum({
  UNKNOWN: { value: 0, label: "未知" },
  MALE: { value: 1, label: "男" },
  FEMALE: { value: 2, label: "女" },
});
