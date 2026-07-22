/**
 * 选项项通用结构
 * @typeParam Value - 选项值类型，默认为 string | number
 */
export interface Item<Value = string | number> {
  /** 显示文本 */
  label?: string;
  /** 选项值 */
  value?: Value;
  /** 额外元数据 */
  meta?: any;
}
