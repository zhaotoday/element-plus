<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useValidators } from '@vuejs-repo/core/composables/useValidators'
import { useDisclosure } from '@overlastic/vue'
import type * as Api from '~/types/api'
import { Upload, Editor } from '@vuejs-repo/element-plus'
import CategorySelect from '~/components/CategorySelect.vue'

const props = defineProps<{
  data: Partial<Api.Content>
}>()

const { isRequired } = useValidators()

const formRef = useTemplateRef<FormInstance>('formRef')
const coverUploadRef =
  useTemplateRef<InstanceType<typeof Upload>>('coverUploadRef')

const isEditorFullscreen = ref(false)

onMounted(() => {
  const checkFullscreen = () => {
    const fullscreenElement = document.querySelector(
      '.w-e-full-screen-container',
    )
    isEditorFullscreen.value = !!fullscreenElement
  }

  const observer = new MutationObserver(checkFullscreen)
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['class'],
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

const formModel = reactive<Partial<Api.Content>>({ ...props.data })

const formRules: FormRules = {
  title: [isRequired({ label: '文章标题' })],
  content: [isRequired({ label: '文章内容' })],
}

const { visible, cancel, confirm } = useDisclosure({
  duration: 200,
})

const route = useRoute()

const { isLoading, execute } = useAdminAxios()

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  const coverFiles = await coverUploadRef.value?.submit()
  const params = {
    ...formModel,
    coverFile: coverFiles?.[0] || undefined,
    module: route.params.module as string,
  }

  if (props.data.id) {
    await execute(`/contents/${props.data.id}`, {
      method: 'PUT',
      data: params,
    })
  } else {
    await execute('/contents', { method: 'POST', data: params })
  }

  ElMessage.success(props.data.id ? '编辑成功' : '新增成功')
  confirm()
}
</script>

<template>
  <el-dialog
    v-model="visible"
    title="文章"
    width="900"
    :z-index="2000"
    align-center
    append-to-body
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="right"
      label-width="80px"
      :validate-on-rule-change="false"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="formModel.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <CategorySelect
          v-model="formModel.categoryId"
          :module="route.params.module as string"
        />
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="text-right">
            <div>封面</div>
            <div class="text-12px text-gray">854x480</div>
          </div>
        </template>
        <Upload
          ref="coverUploadRef"
          type="image"
          :limit="1"
          :default-file-list="formModel?.coverFile ? [formModel.coverFile] : []"
          dir="contents/covers"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor
          v-model="formModel.content!"
          dir="contents/contents"
          style="height: 350px"
        />
      </el-form-item>
      <el-form-item v-show="!isEditorFullscreen" label="排序" prop="order">
        <el-input-number v-model="formModel.order" :min="1" :max="1000000" />
        <div class="text-gray-400 ml-10px">不填时自动设为当前最大排序值 + 1</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
