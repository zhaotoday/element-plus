/**
 * @fileoverview 文件上传 Composable，支持腾讯云 COS 直传和服务器直传
 * @module composables/use-upload
 */

import TencentCloudCos from "cos-js-sdk-v5";
import type { AxiosInstance, AxiosProgressEvent } from "axios";
import { UploadTo } from "../enums/upload";
import type * as Api from "../types/api";

/** 腾讯云 COS 临时凭证响应 */
interface CosCredentialResponse {
  Credentials: {
    TmpSecretId: string;
    TmpSecretKey: string;
    Token: string;
  };
  StartTime: number;
  ExpiredTime: number;
}

/** 创建文件记录的响应 */
interface CreateFileRecordResult {
  id: string;
  date: string;
}

/**
 * {@link useUpload} 配置选项
 */
export interface UseUploadOptions {
  /**
   * 腾讯云 COS 临时凭证 API 实例
   * @remarks 仅 {@link UploadTo.TENCENT_CLOUD_COS} 模式下必传
   */
  cosApi?: AxiosInstance;
  /** 文件管理 API 实例 */
  filesApi: AxiosInstance;
  /**
   * 上传目标
   * @defaultValue {@link UploadTo.SERVER}
   */
  uploadTo?: typeof UploadTo.valueType;
  /**
   * COS 存储区域
   * @remarks 仅 {@link UploadTo.TENCENT_CLOUD_COS} 模式下必传
   */
  region?: string;
  /**
   * COS 存储桶名称
   * @remarks 仅 {@link UploadTo.TENCENT_CLOUD_COS} 模式下必传
   */
  bucket?: string;
  /** 默认上传目录 */
  dir?: string;
  /**
   * 上传进度回调
   * @param percent - 0–100 的整数百分比
   */
  onProgress?: (percent: number) => void;
}

/**
 * 单次上传调用选项
 */
export interface UploadFileOptions {
  /** 要上传的文件 */
  file: File;
  /**
   * 上传目录
   * @remarks 优先级高于 {@link UseUploadOptions.dir}
   */
  dir?: string;
  /**
   * 是否显示错误提示
   * @defaultValue true
   */
  showError?: boolean;
  /**
   * 上传进度回调
   * @remarks 优先级高于 {@link UseUploadOptions.onProgress}
   * @param percent - 0–100 的整数百分比
   */
  onProgress?: (percent: number) => void;
}

/** 提取文件扩展名（不含点号） */
function extractExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf(".") + 1);
}

/**
 * 文件上传 Composable
 *
 * @remarks
 * 支持两种上传模式：
 * - **腾讯云 COS**：通过临时凭证直传到 COS，首次上传时自动初始化客户端，也可提前调用 `initialize` 预热
 * - **服务器直传**：通过 FormData 上传到应用服务器
 *
 * @param options - 上传配置
 * @returns 上传控制方法
 *
 * @example 腾讯云 COS 上传
 * ```typescript
 * const { upload } = useUpload({
 *   cosApi,
 *   filesApi,
 *   uploadTo: UploadTo.TENCENT_CLOUD_COS,
 *   region: "ap-guangzhou",
 *   bucket: "my-bucket-1250000000",
 * });
 *
 * const file = await upload({ file: rawFile, dir: "avatars" });
 * ```
 *
 * @example 服务器直传
 * ```typescript
 * const { upload } = useUpload({
 *   filesApi,
 *   onProgress: (percent) => console.log(`${percent}%`),
 * });
 *
 * const file = await upload({ file: rawFile });
 * ```
 */
export function useUpload(options: UseUploadOptions) {
  const {
    cosApi,
    filesApi,
    uploadTo = UploadTo.SERVER,
    region,
    bucket,
    dir,
    onProgress,
  } = options;

  let cosClient: TencentCloudCos | null = null;

  /**
   * 初始化腾讯云 COS 客户端
   *
   * @remarks
   * COS 模式下可提前调用以预热客户端，也会在首次上传时自动调用。
   * 服务器直传模式下调用无副作用。
   *
   * @throws 当 COS 模式下未提供 `cosApi` 时抛出
   */
  async function initialize(): Promise<void> {
    if (uploadTo !== UploadTo.TENCENT_CLOUD_COS || cosClient) return;

    if (!cosApi) {
      throw new Error("腾讯云 COS 上传需要提供 cosApi 实例");
    }

    const {
      Credentials: { TmpSecretId, TmpSecretKey, Token },
      StartTime,
      ExpiredTime,
    } = await cosApi.post<void, CosCredentialResponse>("get-federation-token", {
      region,
      bucket,
    });

    cosClient = new TencentCloudCos({
      getAuthorization(_, callback) {
        callback({
          TmpSecretId,
          TmpSecretKey,
          SecurityToken: Token,
          StartTime,
          ExpiredTime,
        });
      },
    });
  }

  /**
   * 通过腾讯云 COS 直传文件
   *
   * @remarks 流程：创建文件记录 → 上传至 COS → 标记上传完成
   */
  async function uploadToCos(
    file: File,
    targetDir: string | undefined,
    progressHandler: ((percent: number) => void) | undefined,
  ): Promise<Api.File> {
    await initialize();

    const ext = extractExtension(file.name);

    const { id, date } = await filesApi.post<void, CreateFileRecordResult>("", {
      name: file.name,
      type: file.type,
      ext,
      size: file.size,
      dir: targetDir,
    });

    const objectKey = [targetDir, date, `${id}.${ext}`]
      .filter(Boolean)
      .join("/");

    await new Promise<void>((resolve, reject) => {
      cosClient!.putObject(
        {
          Bucket: bucket!,
          Region: region!,
          Key: objectKey,
          Body: file,
          onProgress: ({ percent }) =>
            progressHandler?.(Math.round(percent * 100)),
        },
        (err) => (err ? reject(err) : resolve()),
      );
    });

    return filesApi.post<void, Api.File>("mark-uploaded", { id });
  }

  /** 通过服务器直传文件 */
  async function uploadToServer(
    file: File,
    targetDir: string | undefined,
    progressHandler: ((percent: number) => void) | undefined,
    showError: boolean,
  ): Promise<Api.File> {
    const formData = new FormData();
    formData.append("file", file);
    if (targetDir) {
      formData.append("dir", targetDir);
    }

    return filesApi.post<void, Api.File>("upload", formData, {
      onUploadProgress: ({ loaded, total }: AxiosProgressEvent) => {
        if (total) {
          progressHandler?.(Math.round((loaded / total) * 100));
        }
      },
      showError,
    } as any);
  }

  /**
   * 上传文件
   *
   * @param uploadOptions - 上传选项
   * @returns 上传成功后的文件信息
   * @throws 当 `uploadTo` 不受支持时抛出
   */
  async function upload(uploadOptions: UploadFileOptions): Promise<Api.File> {
    const {
      file,
      dir: fileDir,
      showError = true,
      onProgress: fileOnProgress,
    } = uploadOptions;

    const targetDir = fileDir ?? dir;
    const progressHandler = fileOnProgress ?? onProgress;

    switch (uploadTo) {
      case UploadTo.TENCENT_CLOUD_COS:
        return uploadToCos(file, targetDir, progressHandler);
      case UploadTo.SERVER:
        return uploadToServer(file, targetDir, progressHandler, showError);
      default:
        throw new Error(`不支持的上传方式: ${uploadTo}`);
    }
  }

  return { initialize, upload };
}
