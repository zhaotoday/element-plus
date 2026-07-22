import { useCos } from "../../upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";
import { ElLoading, ElMessage } from "element-plus";

export const useUpload = ({ props }) => {
  const { ApiUrl } = useConsts();

  const configEditor = async ({ editorConfig }) => {
    if (props.cosConfig) {
      const cos = useCos(props.cosConfig);

      const customUpload = async (file, insertFn) => {
        const loading = ElLoading.service({
          text: "正在上传...",
          lock: true,
          background: "rgba(122, 122, 122, 0.1)",
        });

        await cos.initialize();

        const { id } = await cos.upload(file);
        insertFn(`${ApiUrl}/public/files/${id}`);

        loading.close();
        ElMessage.success("上传成功");
      };

      editorConfig.MENU_CONF["uploadImage"] = { customUpload };
      editorConfig.MENU_CONF["uploadVideo"] = { customUpload };
    } else {
      const config = {
        server: props.uploadAction,
        fieldName: "file",
        maxNumberOfFiles: 1,
        headers: props.uploadHeaders,
        customInsert(res, insertFn) {
          insertFn(`${ApiUrl}/public/files/${res.data.id}`);
        },
      };

      editorConfig.MENU_CONF["uploadImage"] = config;
      editorConfig.MENU_CONF["uploadVideo"] = config;
    }
  };

  return {
    configEditor,
  };
};
