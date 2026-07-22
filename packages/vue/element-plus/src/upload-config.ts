import type { AxiosInstance } from "axios";

/**
 * Upload / Editor 的全局默认配置。
 *
 * @remarks
 * 通过模块级单例保存，不依赖 Vue 组件树上下文，因此在命令式弹窗
 * （如 overlastic 渲染的独立子应用）中同样可用。应用启动时调用
 * {@link configureUpload} 设置一次即可。
 */
export interface UploadDefaults {
  /** 文件管理 API 实例 */
  filesApi?: AxiosInstance;
  /** 文件访问基础 URL，用于回显已上传文件地址 */
  baseUrl?: string;
}

const uploadDefaults: UploadDefaults = {};

/**
 * 设置 Upload / Editor 的全局默认配置。
 *
 * @remarks
 * 为什么用模块级单例而非 Vue 的 provide/inject：
 * 本项目的弹窗通过 overlastic 的 `renderOverlay` 命令式渲染，overlay 组件
 * 挂载在独立子应用（child-app）上，无法继承主应用（含 Nuxt plugin）的
 * provide/inject 链——即便按官方做法挂载 `OverlaysProvider` 也无法打通。
 * 而 filesApi（`adminFilesRequest`）本身就是模块级单例、token 于请求时动态
 * 读取，baseUrl 为静态配置，均不含用户态数据，故用模块单例保存既能在任意
 * 组件树/子应用中稳定取到，也不会引入 SSR 跨请求泄漏问题。
 *
 * @param defaults - 要合并的默认配置
 */
export function configureUpload(defaults: UploadDefaults): void {
  Object.assign(uploadDefaults, defaults);
}

/**
 * 读取当前全局默认配置。
 */
export function getUploadDefaults(): Readonly<UploadDefaults> {
  return uploadDefaults;
}
