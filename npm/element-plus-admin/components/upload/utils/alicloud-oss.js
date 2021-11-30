import { AliCloudStsApi } from "@/apis/admin/alicloud-sts";
import * as OSS from "ali-oss";

export const aliCloudOss = {
  async getClient() {
    const {
      Credentials: { AccessKeyId, AccessKeySecret, SecurityToken },
    } = await new AliCloudStsApi().post({
      action: "getToken",
    });

    return new OSS({
      region: "oss-cn-hangzhou",
      bucket: "fzznx-faie",
      accessKeyId: AccessKeyId,
      accessKeySecret: AccessKeySecret,
      stsToken: SecurityToken,
    });
  },
};
