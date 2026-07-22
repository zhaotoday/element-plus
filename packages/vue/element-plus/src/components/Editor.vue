<template>
  <div class="border border-gray-300 rounded-4px overflow-hidden">
    <Toolbar
      class="border-b border-gray-300"
      :editor="editorInstance"
      :default-config="toolbarConfig"
      mode="default"
    />
    <WangEditor
      :style="editorStyle"
      v-model="model"
      :default-config="editorConfig"
      mode="default"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * 富文本编辑器。基于 wangeditor，支持图片/视频上传与 v-model 绑定 HTML 内容。
 */
import "@wangeditor-next/editor/dist/css/style.css";
import { Editor as WangEditor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from "@wangeditor-next/editor";
import {
  ElLoading,
  ElMessage,
  formItemContextKey,
  type LoadingOptionsResolved,
} from "element-plus";
import { UploadTo, useUpload, type UseUploadOptions } from "@vuejs-repo/core";
import { getFileUrl } from "@vuejs-repo/core/utils/helpers";
import type { StyleValue } from "vue";
import { getUploadDefaults } from "../upload-config";

/**
 * 富文本编辑器组件属性。
 */
export interface EditorProps {
  /** 编辑器容器样式，如高度等 */
  style?: StyleValue;
  /** 文件上传配置（图片/视频上传），未传时用 configureUpload 设置的全局 filesApi 自动构建 */
  uploadConfig?: UseUploadOptions;
  /** 上传目录，uploadConfig 未传时作为便捷属性使用 */
  dir?: string;
  /** 文件访问基础 URL，用于回显已上传文件地址，未传时取 configureUpload 设置的全局值 */
  baseUrl?: string;
}

/** 插入媒体链接的回调，由 wangeditor 在自定义上传完成后调用 */
type InsertFn = (url: string) => void;

const props = withDefaults(defineProps<EditorProps>(), {
  style: "height: 500px",
  dir: "contents",
});

const defaults = getUploadDefaults();

const resolvedBaseUrl = computed(() => props.baseUrl ?? defaults.baseUrl ?? "");

const resolvedUploadConfig = computed<UseUploadOptions>(() => {
  if (props.uploadConfig) return props.uploadConfig;
  return {
    filesApi: defaults.filesApi!,
    uploadTo: UploadTo.SERVER,
    dir: props.dir,
  };
});

const rawModel = defineModel<string>({ default: "" });

function isEmptyHtml(html: string | undefined) {
  if (!html) return true;
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").trim().length === 0;
}

const model = computed({
  get: () => rawModel.value,
  set: (val) => {
    rawModel.value = isEmptyHtml(val) ? "" : val;
  },
});

const elFormItem = inject(formItemContextKey, undefined);
watch(rawModel, (val) => {
  if (elFormItem?.validateState === "error" && val) {
    elFormItem.clearValidate();
  }
});

/** 编辑器实例（须用 shallowRef 避免深层响应式代理） */
const editorInstance = shallowRef<IDomEditor>();

const editorStyle = computed(() => props.style);

/** 工具栏配置，排除不需要的字体选择菜单 */
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ["fontFamily"],
};

/** 文件上传服务实例，用于处理图片和视频上传 */
const uploadService = useUpload(resolvedUploadConfig.value);

/**
 * 自定义文件上传处理：上传文件到服务器或 COS，成功后将 URL 插入编辑器。
 *
 * @param file - 待上传的文件
 * @param insertFn - wangeditor 提供的媒体插入回调
 */
async function handleCustomUpload(file: File, insertFn: InsertFn) {
  let loading: ReturnType<typeof ElLoading.service> | null = null;

  try {
    loading = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: "正在上传...",
      background: "rgba(122, 122, 122, 0.1)",
    } as LoadingOptionsResolved);

    const uploaded = await uploadService.upload({
      file,
      dir: resolvedUploadConfig.value.dir,
      showError: false,
    });

    insertFn(getFileUrl(uploaded, { baseUrl: resolvedBaseUrl.value }));
    ElMessage.success("上传成功");
  } catch {
    ElMessage.error("上传失败，请重试");
  } finally {
    loading?.close();
  }
}

/** wangeditor 在运行时深度合并配置，此处仅需满足 TypeScript 类型要求 */
const uploadConfigBase = {
  metaWithUrl: false,
  onSuccess() {},
  onFailed() {},
  onError() {},
} as const;

/** 编辑器核心配置，含占位文本与自定义图片/视频上传 */
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      ...uploadConfigBase,
      customUpload: handleCustomUpload,
      base64LimitSize: 5 * 1024,
    },
    uploadVideo: {
      ...uploadConfigBase,
      customUpload: handleCustomUpload,
    },
  },
};

onMounted(async () => {
  if (resolvedUploadConfig.value.uploadTo !== UploadTo.SERVER) {
    try {
      await uploadService.initialize();
    } catch {
      ElMessage.error("编辑器初始化失败");
    }
  }
});

onBeforeUnmount(() => {
  if (editorInstance.value && !editorInstance.value.isDestroyed) {
    editorInstance.value.destroy();
  }
});

/** 编辑器创建完成回调，保存编辑器实例引用 */
function handleCreated(editor: IDomEditor) {
  editorInstance.value = editor;
}
</script>
