import { useAliCloudOss } from "../../upload/composables/use-alicloud-oss";
import { useConsts } from "@/composables/use-consts";

export const useUploadImage = ({ region, bucket, props, editor }) => {
  const { ApiUrl } = useConsts();

  const aliClousOss = useAliCloudOss({
    region,
    bucket,
  });

  editor.config.uploadImgMaxLength = 1;

  editor.config.uploadImgServer = props.uploadAction;

  editor.config.uploadImgHeaders = props.uploadHeaders;

  if (props.uploadTo === "Server") {
    editor.config.uploadImgHooks = {
      customInsert: (insertImg, result) => {
        insertImg(`${ApiUrl}/public/files/${result.data.id}`);
      },
    };
  } else {
    editor.config.customUploadImg = function (resultFiles, insertImg) {
      insertImg(imgUrl);
    };
  }

  const initializeClient = async () => {
    switch (props.uploadTo) {
      case "AliCloudOss":
        aliCloudOssClient = await aliCloudOss.getClient();
        break;

      default:
        break;
    }
  };

  return {
    initializeClient,
  };
};
