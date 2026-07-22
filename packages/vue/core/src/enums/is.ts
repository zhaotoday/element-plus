import { Enum } from "enum-plus";

/**
 * 是否枚举
 */
export const Is = Enum({
  TRUE: { value: 1, label: "是" },
  FALSE: { value: 0, label: "否" },
});
