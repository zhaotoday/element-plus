import { Enum } from "enum-plus";

/**
 * 内容类型枚举
 */
export const ContentType = Enum({
  ARTICLE: { value: "article", label: "文章" },
  LINK: { value: "link", label: "链接" },
});
