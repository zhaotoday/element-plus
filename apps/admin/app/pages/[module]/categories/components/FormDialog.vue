<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useValidators } from '@vuejs-repo/core/composables/useValidators'
import { useDisclosure } from '@overlastic/vue'
import type * as Api from '~/types/api'

const props = defineProps<{
  data: Partial<Api.Category>
}>()

const { isRequired } = useValidators()

const formRef = useTemplateRef<FormInstance>('formRef')

const formModel = reactive<Partial<Api.Category>>({ ...props.data })

const formRules: FormRules = {
  name: [isRequired({ label: '分类名称' })],
}

const { visible, cancel, confirm } = useDisclosure({
  duration: 200,
})

const route = useRoute()

const { isLoading, execute } = useAdminAxios()

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  const params = { ...formModel }
  params.module = route.params.module as string

  if (props.data.id) {
    await execute(`/categories/${props.data.id}`, {
      method: 'PUT',
      data: params,
    })
  } else {
    await execute('/categories', {
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
    title="分类"
    width="450"
    :z-index="2000"
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
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="formModel.name" placeholder="请输入分类名称" />
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
