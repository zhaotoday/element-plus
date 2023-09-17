import { useCos } from "element-plus-admin/components/upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";

export const useUploadImage = ({ props }) => {
  const { ApiUrl } = useConsts();

  const configEditor = async ({ editorConfig }) => {
    if (props.cosConfig) {
      const cos = useCos(props.cosConfig);

      await cos.initialize();

      editorConfig.MENU_CONF["uploadImage"] = {
        customBrowseAndUpload(insertFn) {
          resultFiles.forEach(async (file) => {
            const { id } = await cos.upload(file);
            insertFn(`${ApiUrl}/public/files/${id}`);
          });
        },
      };
    } else {
      editorConfig.MENU_CONF["uploadImage"] = {
        server: props.uploadAction,
        fieldName: "file",
        maxNumberOfFiles: 1,
        headers: props.uploadHeaders,
        customInsert(res, insertFn) {
          insertFn(`${ApiUrl}/public/files/${res.data.id}`);
        },
      };
    }
  };

  return {
    configEditor,
  };
};
