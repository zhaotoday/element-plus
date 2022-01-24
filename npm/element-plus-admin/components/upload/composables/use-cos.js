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
            credentials: { tmpSecretId, tmpSecretKey, sessionToken },
            startTime,
            expiredTime,
          } = await api.post({
            action: "getStsCredential",
            body: { region, bucket },
          });
          client = new TencentCloudCos({
            getAuthorization(options, callback) {
              callback({
                TmpSecretId: tmpSecretId,
                TmpSecretKey: tmpSecretKey,
                SecurityToken: sessionToken,
                StartTime: startTime,
                ExpiredTime: expiredTime,
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
