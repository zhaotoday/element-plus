<template>
  <component
    :is="type === 'image' ? UploadImageList : UploadFileList"
    v-model="fileList"
    :limit="limit"
  >
    <template #upload>
      <el-upload
        :class="{
          '[&_.el-upload]:w-100px [&_.el-upload]:h-100px': type === 'image',
        }"
        v-model:file-list="fileList"
        :list-type="type === 'image' ? 'picture-card' : 'text'"
        :show-file-list="false"
        :auto-upload="false"
        :accept="
          accept || (type === 'image' ? '.jpg,.jpeg,.png,.webp' : accept)
        "
        :limit="limit"
      >
        <div
          v-if="type === 'image'"
          class="flex flex-col justify-center items-center w-100px h-100px text-gray-4"
          :title="placeholder"
        >
          <el-icon size="22">
            <Plus />
          </el-icon>
          <p v-if="limit > 1" class="leading-100% pt-6px">
            {{ fileList.length }} / {{ limit }}
          </p>
        </div>
        <el-button v-else>{{ placeholder }}</el-button>
      </el-upload>
    </template>
  </component>
</template>

<script setup lang="ts">
/**
 * 文件上传组件。支持普通文件列表与图片列表（拖拽排序、预览），可对接服务器或 COS。
 * 通过 ref 调用 submit() 获取当前所有文件的 API 对象数组。
 */
import { Plus } from "@element-plus/icons-vue";
import UploadImageList from "./UploadImageList.vue";
import UploadFileList from "./UploadFileList.vue";
import { Api, UploadTo, useUpload } from "@vuejs-repo/core";
import { getFileUrl } from "@vuejs-repo/core/utils/helpers";
import type { AxiosInstance } from "axios";
import type { UploadFile } from "element-plus/es/components/upload/src/upload";
import { getUploadDefaults } from "../../upload-config";

/**
 * 文件上传组件属性。
 */
export interface UploadProps {
  /** 上传类型：file 为普通文件列表，image 为图片列表（带预览、拖拽排序） */
  type?: "file" | "image";
  /** 上传按钮提示文本 */
  placeholder?: string;
  /** 默认文件列表，用于回显已上传的文件 */
  defaultFileList?: Api.File[];
  /** 接受的文件类型，如 ".pdf,.doc,.docx" */
  accept?: string;
  /** 最大上传数量 */
  limit?: number;
  /** COS API 实例（uploadTo 为 COS 时使用） */
  cosApi?: AxiosInstance;
  /** 文件 API 实例（uploadTo 为 SERVER 时使用），未传时取 configureUpload 设置的全局值 */
  filesApi?: AxiosInstance;
  /** 上传目标：服务器或 COS */
  uploadTo?: typeof UploadTo.valueType;
  /** COS 地区 */
  region?: string;
  /** COS 存储桶 */
  bucket?: string;
  /** 上传目录 */
  dir?: string;
  /** 文件访问基础 URL，用于回显地址，未传时取 configureUpload 设置的全局值 */
  baseUrl?: string;
}

const props = withDefaults(defineProps<UploadProps>(), {
  type: "file",
  placeholder: "请选择文件",
  limit: 1,
  uploadTo: UploadTo.SERVER,
  defaultFileList: () => [],
});

const defaults = getUploadDefaults();

const resolvedFilesApi = computed(() => props.filesApi ?? defaults.filesApi);
const resolvedBaseUrl = computed(() => props.baseUrl ?? defaults.baseUrl ?? "");

const { initialize, upload } = useUpload({
  cosApi: props.cosApi,
  filesApi: resolvedFilesApi.value!,
  uploadTo: props.uploadTo,
  region: props.region,
  bucket: props.bucket,
});

/** 当前文件列表（el-upload 格式） */
const fileList = ref<UploadFile[]>([]);

/** 已上传文件映射表，通过 uid 或 url 快速查找对应的 API 文件对象，供 submit 使用 */
const uploadedFileMap = ref(new Map<string | number, Api.File>());

/**
 * 将 API 文件对象转换为 el-upload 所需的 UploadFile 格式。
 *
 * @param apiFile - 后端返回的文件对象
 * @returns el-upload 兼容的文件对象
 */
function toUploadFile(apiFile: Api.File): UploadFile {
  const url = apiFile.url || getFileUrl(apiFile, { baseUrl: resolvedBaseUrl.value });
  return {
    name: apiFile.name,
    url,
    uid: apiFile.id as any,
    status: "success",
  } as UploadFile;
}

watch(
  () => props.defaultFileList,
  (list) => {
    uploadedFileMap.value.clear();
    fileList.value = list.map((apiFile) => {
      uploadedFileMap.value.set(apiFile.id as any, apiFile);
      if (apiFile.url) {
        uploadedFileMap.value.set(apiFile.url, apiFile);
      }
      return toUploadFile(apiFile);
    });
  },
  { immediate: true },
);

onMounted(() => {
  if (props.uploadTo !== UploadTo.SERVER) {
    initialize();
  }
});

/**
 * 执行上传并返回所有文件的 API 对象数组（含新上传和已有文件）。
 */
async function submit(): Promise<Api.File[]> {
  return Promise.all(
    fileList.value.map(async (file) => {
      if (file.raw) {
        return upload({ file: file.raw as File, dir: props.dir });
      }

      const existing =
        uploadedFileMap.value.get(file.uid) ||
        uploadedFileMap.value.get(file.url!);
      if (existing) return existing;

      throw new Error(`文件 ${file.name} 未找到对应的 API 文件信息`);
    }),
  );
}

defineExpose({
  /** 提交上传并返回所有文件信息（新上传 + 已有） */
  submit,
});
</script>
