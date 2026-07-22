/**
 * 分页查询参数
 */
export interface PaginationQuery {
  /** 偏移量 */
  offset: number;
  /** 限制数量 */
  limit: number;
  /** 查询条件 */
  where?: Record<string, any>;
}

/**
 * API 查询参数
 */
export interface QueryParams extends PaginationQuery {
  [key: string]: any;
}
