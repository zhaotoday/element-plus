import { Enum } from "enum-plus";

/**
 * 上传位置枚举
 */
export const UploadTo = Enum({
  SERVER: { value: "server", label: "上传至服务器" },
  TENCENT_CLOUD_COS: { value: "tencent-cloud-cos", label: "上传至腾讯云 COS" },
});
