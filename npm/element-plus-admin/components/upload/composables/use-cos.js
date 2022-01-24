import { filesApi } from "@/apis/admin/files";
import * as AliCloudOss from "ali-oss";
import * as TencentCloudCos from "cos-js-sdk-v5";
import { UploadTo } from "../../../enums/upload-to";

export const useCos = ({ api, uploadTo, region, bucket, onProgress }) => {
  let client = null;

  const initialize = async () => {
    switch (uploadTo) {
      case UploadTo.AliCloudOss:
        {
          const {
            Credentials: { AccessKeyId, AccessKeySecret, SecurityToken },
          } = await api.post({
            action: "getStsCredential",
            body: { region, bucket },
          });

          client = new AliCloudOss({
            region,
            bucket,
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
          });
        }

        break;

      case UploadTo.TencentCloudOss:
        {
          const {
            credentials: {
              tmpSecretId,
              tmpSecretKey,
              sessionToken,
              startTime,
              expiredTime,
            },
          } = await api.post({
            action: "getStsCredential",
            body: { region, bucket },
          });
          client = new TencentCloudCos({
            getAuthorization: function (options, callback) {
              callback({
                TmpSecretId: tmpSecretId,
                TmpSecretKey: tmpSecretKey,
                SecurityToken: sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
              });
            },
          });
        }
        break;

      default:
        break;
    }
  };

  const upload = async (file, fileDir) => {
    const { name, type, size } = file;
    const ext = name.split(".").pop();

    const { id, date, uuid } = await filesApi.post({
      action: "create",
      body: { dir: fileDir },
    });

    await client.multipartUpload(
      `${fileDir ? fileDir + "/" : ""}${date}/${uuid}.${ext}`,
      file,
      {
        progress(p) {
          onProgress && onProgress(+(p * 100).toFixed(0));
        },
        parallel: 4,
        partSize: 1024 * 1024,
        meta: { year: 2020, people: "test" },
        mime: "text/plain",
      }
    );

    onProgress && onProgress(0);

    await filesApi.post({
      action: "update",
      body: { date, uuid, name, type, ext, size },
    });

    return { id };
  };

  return {
    client,
    initialize,
    upload,
  };
};
