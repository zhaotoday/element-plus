import { useAliCloudOss } from "../../upload/composables/use-alicloud-oss";
import { useConsts } from "@/composables/use-consts";

export const useUploadImage = ({ region, bucket }) => {
  const { ApiUrl } = useConsts();

  const aliCloudOss = useAliCloudOss({
    region,
    bucket,
  });

  const configEditor = async (editor, props) => {
    editor.config.uploadImgMaxLength = 1;

    if (props.uploadTo === "Server") {
      editor.config.uploadImgServer = props.uploadAction;

      editor.config.uploadImgHeaders = props.uploadHeaders;

      editor.config.uploadImgHooks = {
        customInsert: (insertImg, result) => {
          insertImg(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };
    } else {
      editor.config.uploadImgServer = props.uploadAction;

      editor.config.uploadImgHeaders = props.uploadHeaders;

      await aliCloudOss.initialize();

      editor.config.customUploadImg = (resultFiles, insertImg) => {
        resultFiles.forEach(async (file) => {
          const { id } = await aliCloudOss.upload(file);
          insertImg(`${ApiUrl}/public/files/${id}`);
        });
      };
    }
  };

  return {
    configEditor,
  };
};
