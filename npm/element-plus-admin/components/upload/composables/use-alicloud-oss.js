import { filesApi } from "@/apis/admin/files";
import { aliCloudStsApi } from "@/apis/admin/alicloud-sts";
import * as Oss from "ali-oss";

export const useAliCloudOss = ({ region, bucket, onProgress }) => {
  let client = null;

  const initialize = async () => {
    const {
      Credentials: { AccessKeyId, AccessKeySecret, SecurityToken },
    } = await new AliCloudStsApi().post({
      action: "getToken",
    });

    client = new Oss({
      region,
      bucket,
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
    });
  };

  const upload = async (file, fileDir) => {
    const { name, type, size } = file;
    const ext = name.split(".").pop();

    const { id, date, uuid } = await new FilesApi().post({
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

    await new FilesApi().post({
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
