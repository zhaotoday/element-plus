import type { Item } from "../types/item";
import type { File } from "../types/api";
import { getFileUrlDefaults } from "./file-url-config";

export {
  configureFileUrl,
  getFileUrlDefaults,
  type FileUrlDefaults,
} from "./file-url-config";

/**
 * 获取文件访问 URL
 * @param idOrFile - 文件 ID 字符串或 File 对象
 * @param options - 配置选项；`baseUrl` 未传时取 {@link configureFileUrl} 设置的全局值
 * @returns 完整的文件访问 URL
 */
export function getFileUrl(
  idOrFile: string | File | undefined,
  options?: { baseUrl?: string },
): string {
  const baseUrl = options?.baseUrl ?? getFileUrlDefaults().baseUrl ?? "";

  if (!idOrFile) {
    return "";
  }

  if (typeof idOrFile === "string") {
    return `${baseUrl}/public/files/${idOrFile}`;
  }

  const file = idOrFile;
  const dirPath = file.dir ? `${file.dir}/` : "";
  return `${baseUrl}/files/${dirPath}${file.date}/${file.id}.${file.ext}`;
}

/**
 * 加密手机号码，显示前 3 位和后 4 位，中间用 **** 替代
 * @param phoneNumber - 手机号码字符串
 * @returns 加密后的手机号码，如果输入为空则返回空字符串
 * @example
 * ```ts
 * encryptPhoneNumber('13812345678') // '138****5678'
 * ```
 */
export function encryptPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber || phoneNumber.length < 11) return "";
  return `${phoneNumber.substring(0, 3)}****${phoneNumber.substring(7)}`;
}

/**
 * 根据值从选项列表中查找对应的选项项
 * @param items - 选项列表
 * @param value - 要查找的值
 * @returns 匹配的选项项，如果未找到则返回空对象
 */
export function getItem<T extends string | number>(
  items: Item<T>[],
  value: T,
): Item<T> {
  if (!items?.length) return {} as Item<T>;
  return items.find((item) => item.value === value) ?? ({} as Item<T>);
}

/**
 * 根据值从选项列表中获取对应的标签文本
 * @param items - 选项列表
 * @param value - 要查找的值
 * @returns 匹配选项的标签文本，如果未找到则返回空字符串
 */
export function getItemLabel<T extends string | number>(
  items: Item<T>[],
  value: T,
): string {
  return getItem(items, value)?.label ?? "";
}

/**
 * 格式化时间
 * @param time - 时间字符串或 Date 对象
 * @param format - 格式化模板，默认为 'YYYY-MM-DD HH:mm'
 * @returns 格式化后的时间字符串
 * @example
 * ```ts
 * formatTime(new Date()) // '2023-12-01 14:30'
 * formatTime('2023-12-01', 'YYYY年MM月DD日') // '2023年12月01日'
 * ```
 */
export function formatTime(
  time: string | Date,
  format = "YYYY-MM-DD HH:mm",
): string {
  const d = time instanceof Date ? time : new Date(time);
  const parts: Record<string, number> = {
    Y: d.getFullYear(),
    M: d.getMonth() + 1,
    D: d.getDate(),
    H: d.getHours(),
    m: d.getMinutes(),
    s: d.getSeconds(),
  };

  return format.replace(
    /Y{2,4}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}/g,
    (token: string) => {
      const val = parts[token.charAt(0)];
      if (token === "YY") return String(val).slice(-2);
      return token.length > 1 ? String(val).padStart(2, "0") : String(val);
    },
  );
}

/**
 * 下载文件
 * @param url - 文件下载链接
 * @param fileName - 保存的文件名（可选，不传则使用浏览器默认文件名）
 */
export function download(url: string, fileName?: string): void {
  const link = document.createElement("a");
  link.href = url;
  if (fileName) {
    link.download = fileName;
  }

  document.body.appendChild(link);
  link.click();
  link.remove();
}
