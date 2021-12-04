import { FilesApi } from "@/apis/admin/files";
import { AliCloudStsApi } from "@/apis/admin/alicloud-sts";
import * as OSS from "ali-oss";

export const useAliCloudOss = ({ onProgress }) => {
  let client = null;

  const initialize = async () => {
    const {
      Credentials: { AccessKeyId, AccessKeySecret, SecurityToken },
    } = await new AliCloudStsApi().post({
      action: "getToken",
    });

    client = new OSS({
      region: "oss-cn-hangzhou",
      bucket: "fzznx-faie",
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
    });
  };

  const upload = async (file) => {
    const { name, type, size } = file;
    const ext = name.split(".").pop();

    const { id, date, uuid } = await new FilesApi().post({
      action: "create",
    });

    await client.multipartUpload(`${date}/${uuid}.${ext}`, file, {
      progress(p) {
        onProgress(+(p * 100).toFixed(0));
      },
      parallel: 4,
      partSize: 1024 * 1024,
      meta: { year: 2020, people: "test" },
      mime: "text/plain",
    });

    onProgress(0);

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
