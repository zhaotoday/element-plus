import type { Reactive } from "vue";
import { reactive } from "vue";
import type { AxiosInstance } from "axios";
import { useAsyncState } from "@vueuse/core";
import type { List, Details } from "../types/api";
import { getListDefaults } from "./listConfig";

/** 默认分页大小 */
const DEFAULT_PAGE_SIZE = 10;

/**
 * 消息处理器
 */
interface MessageHandler {
  /**
   * 显示成功消息
   * @param message - 消息内容
   */
  success: (message: string) => void;
}

/**
 * 消息文本配置
 */
interface MessageTexts {
  /** 删除成功提示文案 */
  removeSuccess?: string;
  /** 刷新成功提示文案 */
  reloadSuccess?: string;
}

/**
 * {@link useList} 配置项
 * @typeParam T - 列表项类型，需包含可选的 `id` 字段
 */
export interface UseListOptions<T extends Partial<Details>> {
  /** Axios 实例 */
  request: AxiosInstance;
  /** API 端点路径（如 `/api/users`） */
  url: string;
  /**
   * 额外查询参数生成函数
   * @returns 查询参数对象，其中 `where` 会与分页 where 合并
   */
  query?: () => Record<string, unknown>;
  /** 列表初始状态 */
  initialState: List<T>;
  /** 过滤条件（响应式对象，`model` 字段会被合并到 where 中） */
  filterState?: Reactive<{ model: Record<string, unknown> }>;
  /** 消息处理器（用于显示操作成功提示） */
  message?: MessageHandler;
  /** 消息文本配置 */
  messageTexts?: MessageTexts;
  /**
   * 是否立即执行首次请求
   * @defaultValue true
   */
  immediate?: boolean;
  /**
   * 删除成功后是否显示提示
   * @defaultValue true
   */
  showRemoveSuccess?: boolean;
  /**
   * 刷新成功后是否显示提示
   * @defaultValue true
   */
  showReloadSuccess?: boolean;
  /**
   * 每页数据条数
   * @defaultValue 10
   */
  pageSize?: number;
}

/**
 * 列表数据管理组合式函数
 *
 * @description
 * 封装分页列表常用操作：加载、搜索、分页切换、删除和刷新。
 * 配合 `createAxiosInstance` 创建的 Axios 实例，自动处理 where 格式化
 * 与 Sequelize 查询参数序列化。
 *
 * @typeParam T - 列表项类型
 * @param options - 配置项
 * @returns 列表状态与操作方法
 *
 * @example
 * ```typescript
 * const {
 *   state,
 *   isLoading,
 *   pagination,
 *   execute,
 *   search,
 *   changePage,
 *   remove,
 *   reload,
 * } = useList({
 *   request: axiosInstance,
 *   url: '/api/users',
 *   initialState: { total: 0, items: [] },
 *   query: () => ({ include: [{ model: 'Profile' }] }),
 *   message: { success: (msg) => toast.success(msg) },
 * });
 * ```
 */
export function useList<T extends Partial<Details>>({
  request,
  url,
  query,
  initialState,
  filterState,
  message,
  messageTexts,
  immediate = true,
  showRemoveSuccess = true,
  showReloadSuccess = true,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseListOptions<T>) {
  /** message 未传时取全局默认（见 {@link configureList}） */
  const resolvedMessage = message ?? getListDefaults().message;
  /** 分页状态 */
  const pagination = reactive({
    currentPage: 1,
    pageSize,
    where: {} as Record<string, unknown>,
  });

  const { isLoading, state, execute } = useAsyncState<List<T>>(
    () => {
      const { where, ...restQuery } = query?.() ?? {};
      return request.get(url, {
        params: {
          offset: (pagination.currentPage - 1) * pagination.pageSize,
          limit: pagination.pageSize,
          where: { ...(where as Record<string, unknown>), ...pagination.where },
          ...restQuery,
        },
      });
    },
    initialState,
    { resetOnExecute: false, immediate },
  );

  /** 搜索列表（重置到第一页并将 filterState.model 应用为 where 条件） */
  async function search() {
    pagination.currentPage = 1;
    pagination.where = { ...filterState?.model };
    await execute();
  }

  /** 切换分页 */
  async function changePage(page: number) {
    pagination.currentPage = page;
    await execute();
  }

  /** 删除列表项 */
  async function remove({ id }: Pick<T, "id">) {
    await request.delete(`${url}/${id}`);
    await execute();
    if (showRemoveSuccess) {
      resolvedMessage?.success(messageTexts?.removeSuccess ?? "删除成功");
    }
  }

  /** 重新加载列表（重置到第一页并重新请求数据） */
  async function reload() {
    pagination.currentPage = 1;
    await execute();
    if (showReloadSuccess) {
      resolvedMessage?.success(messageTexts?.reloadSuccess ?? "刷新成功");
    }
  }

  return {
    isLoading,
    state,
    pagination,
    execute,
    search,
    changePage,
    remove,
    reload,
  };
}
