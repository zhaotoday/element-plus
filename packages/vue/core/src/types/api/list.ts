/**
 * 列表接口
 * @template Item 列表项类型
 */
export interface List<Item> {
  /** 总数量 */
  total: number;
  /** 列表项数组 */
  items: Item[];
}
