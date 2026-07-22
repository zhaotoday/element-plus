<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { Rules } from '@vuejs-repo/core'
import { useValidators } from '@vuejs-repo/core/composables/useValidators'
import { Lock, User } from '@element-plus/icons-vue'

const { login } = useManagerStore()
const router = useRouter()
const route = useRoute()
const { isRequired, isPassword } = useValidators()

const formRef = useTemplateRef<FormInstance>('formRef')

const formState = reactive({
  model: {
    username: '',
    password: '',
  },
  rules: {
    username: [isRequired({ label: '用户名' })],
    password: [isRequired({ label: '密码' }), isPassword()],
  } as Rules,
})

const isLoading = ref(false)

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  isLoading.value = true
  try {
    await login(formState.model)
    ElMessage.success('登录成功')
    const redirect = (route.query.redirect as string) || '/home/ads'
    await router.push(redirect)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="absolute top-1/2 right-50px -translate-y-1/2 w-360px p-[44px_36px_24px_36px] bg-white rounded-2px"
  >
    <h3 class="pb-26px text-18px">管理员登录</h3>
    <el-form
      ref="formRef"
      class="form"
      :model="formState.model"
      :rules="formState.rules"
    >
      <el-form-item prop="username">
        <el-input
          v-model.trim="formState.model.username"
          size="large"
          placeholder="请输入用户名"
          :prefix-icon="User"
          @keyup.enter="handleSubmit"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formState.model.password"
          type="password"
          size="large"
          placeholder="请输入密码"
          autocomplete="new-password"
          :prefix-icon="Lock"
          @keyup.enter="handleSubmit"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-full mt-10px"
          type="primary"
          size="large"
          block
          :loading="isLoading"
          @click="handleSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  .el-form-item {
    margin-bottom: 24px;
  }
}
</style>
