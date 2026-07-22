/**
 * {@link getFileUrl} 的全局默认配置
 */
export interface FileUrlDefaults {
  /** 文件访问基础 URL */
  baseUrl?: string;
}

const fileUrlDefaults: FileUrlDefaults = {};

/**
 * 设置 {@link getFileUrl} 的全局默认配置。
 *
 * @remarks
 * 通过模块级单例保存，页面代码可省略 `baseUrl` 参数直接调用
 * `getFileUrl(file)`。应用启动时调用一次即可。
 *
 * @example
 * ```ts
 * // Nuxt plugin
 * configureFileUrl({ baseUrl: config.public.apiBaseUrl });
 * ```
 */
export function configureFileUrl(defaults: FileUrlDefaults): void {
  Object.assign(fileUrlDefaults, defaults);
}

/**
 * 读取 {@link getFileUrl} 当前的全局默认配置
 */
export function getFileUrlDefaults(): Readonly<FileUrlDefaults> {
  return fileUrlDefaults;
}
