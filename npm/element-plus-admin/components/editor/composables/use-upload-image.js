import { useCos } from "../../upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";
import {UploadTo} from "../../../enums/upload-to";

export const useUploadImage = ({ region, bucket }) => {
  const { ApiUrl } = useConsts();

  const aliCloudOss = useCos({
    region,
    bucket,
  });

  const configEditor = async (editor, props) => {
    editor.config.uploadImgMaxLength = 1;

    editor.config.uploadImgServer = props.uploadAction;

    editor.config.uploadImgHeaders = props.uploadHeaders;

    if (props.cosConfig.uploadTo === UploadTo.Server) {
      editor.config.uploadImgHooks = {
        customInsert: (insertImg, result) => {
          insertImg(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };
    } else {
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
