/**
 * {@link useList} 的全局默认配置
 */
export interface ListDefaults {
  /** 消息处理器（用于显示操作成功提示） */
  message?: {
    success: (message: string) => void;
  };
}

const listDefaults: ListDefaults = {};

/**
 * 设置 {@link useList} 的全局默认配置。
 *
 * @remarks
 * 通过模块级单例保存，不依赖 Vue 组件树上下文，可在 SSR、命令式弹窗
 * 等场景稳定取到。应用启动时调用一次即可，之后所有 `useList` 未显式
 * 传入的字段都会用这里配置的默认值兜底。
 *
 * @example
 * ```ts
 * // Nuxt plugin
 * configureList({
 *   message: { success: (msg) => ElMessage.success(msg) },
 * });
 * ```
 */
export function configureList(defaults: ListDefaults): void {
  Object.assign(listDefaults, defaults);
}

/**
 * 读取 {@link useList} 当前的全局默认配置
 */
export function getListDefaults(): Readonly<ListDefaults> {
  return listDefaults;
}
