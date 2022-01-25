import { useCos } from "../../upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";
import { UploadTo } from "../../../enums/upload-to";

export const useUploadImage = (cosConfig) => {
  const { ApiUrl } = useConsts();

  const cos = useCos(cosConfig);

  const configEditor = async (editor, props) => {
    editor.config.uploadImgMaxLength = 1;

    editor.config.uploadImgServer = props.uploadAction;

    editor.config.uploadImgHeaders = props.uploadHeaders;

    if (this.props.cosConfig) {
      await cos.initialize();

      editor.config.customUploadImg = (resultFiles, insertImg) => {
        resultFiles.forEach(async (file) => {
          const { id } = await cos.upload(file);
          insertImg(`${ApiUrl}/public/files/${id}`);
        });
      };
    } else {
      editor.config.uploadImgHooks = {
        customInsert: (insertImg, result) => {
          insertImg(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };
    }
  };

  return {
    configEditor,
  };
};
