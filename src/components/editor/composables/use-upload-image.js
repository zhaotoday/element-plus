import { useCos } from "element-plus-admin/components/upload/composables/use-cos";
import { useConsts } from "@/composables/use-consts";
import { ElLoading, ElMessage } from "element-plus";

export const useUploadImage = ({ props }) => {
  const { ApiUrl } = useConsts();

  const configEditor = async ({ editorConfig }) => {
    if (props.cosConfig) {
      const cos = useCos(props.cosConfig);

      editorConfig.MENU_CONF["uploadImage"] = {
        async customUpload(file, insertFn) {
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
