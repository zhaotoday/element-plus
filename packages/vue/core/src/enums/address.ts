import { Enum } from "enum-plus";

/**
 * 地址标签枚举
 */
export const AddressTag = Enum({
  HOME: { value: "home", label: "家" },
  COMPANY: { value: "company", label: "公司" },
  SCHOOL: { value: "school", label: "学校" },
  OTHER: { value: "other", label: "其他" },
});
