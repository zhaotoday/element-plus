<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useValidators } from '@vuejs-repo/core/composables/useValidators'
import { useDisclosure } from '@overlastic/vue'
import type * as Api from '~/types/api'
import { Upload } from '@vuejs-repo/element-plus'

const props = defineProps<{
  data: Partial<Api.Ad>
}>()

const { isRequired } = useValidators()

const formRef = useTemplateRef<FormInstance>('formRef')
const imageUploadRef =
  useTemplateRef<InstanceType<typeof Upload>>('imageUploadRef')

const formModel = reactive<Partial<Api.Ad>>({ ...props.data })

const formRules: FormRules = {
  title: [isRequired({ label: '标题' })],
}

const { visible, cancel, confirm } = useDisclosure({
  duration: 200,
})

const route = useRoute()

const { isLoading, execute } = useAdminAxios()

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  const imageFiles = await imageUploadRef.value?.submit()
  const params = { ...formModel }
  params.imageFile = imageFiles?.[0] || undefined
  params.module = route.params.module as string

  if (props.data.id) {
    await execute(`/ads/${props.data.id}`, {
      method: 'PUT',
      data: params,
    })
  } else {
    await execute('/ads', {
      method: 'POST',
      data: params,
      params: {
        where: {
          module: {
            $eq: params.module,
          },
        },
      },
    })
  }

  ElMessage.success(props.data.id ? '编辑成功' : '新增成功')
  confirm()
}
</script>

<template>
  <el-dialog
    v-model="visible"
    title="轮播图"
    width="600"
    :z-index="2000"
    append-to-body
    destroy-on-close
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="right"
      label-width="110px"
      :validate-on-rule-change="false"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="formModel.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model.trim="formModel.description"
          type="textarea"
          :rows="2"
          placeholder="请输入描述"
        />
      </el-form-item>
      <el-form-item label="图片">
        <Upload
          ref="imageUploadRef"
          type="image"
          :limit="1"
          :default-file-list="formModel?.imageFile ? [formModel.imageFile] : []"
          dir="ads/images"
        />
      </el-form-item>
      <el-form-item label="排序" prop="order">
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
