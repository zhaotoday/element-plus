<template>
  <div class="p-20px">
    <el-form
      ref="formRef"
      :model="formState.model"
      :rules="formState.rules"
      size="large"
    >
      <el-form-item prop="phoneNumber">
        <el-input
          v-model="formState.model.phoneNumber"
          maxlength="11"
          placeholder="请输入手机号"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <i class="i-carbon-phone text-16px" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="flex-[0_0_200px]">
          <el-input
            v-model="formState.model.captcha"
            maxlength="6"
            placeholder="请输入验证码"
            @keyup.enter="handleSubmit"
          >
            <template #prefix>
              <i class="i-carbon-locked text-16px" />
            </template>
          </el-input>
        </div>
        <div class="flex-1 ml-6px">
          <el-button class="w-full" :disabled="!captcha.canSend.value" @click="captcha.send()">
            {{ captcha.buttonText.value }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item v-if="showAgreement" class="-mt-10px">
        <el-checkbox v-model="formState.model.agreed" size="large">
          <span class="text-#999">
            我同意
            <a class="text-#565656 opacity-80" :href="agreementUrl" target="_blank">《服务协议》</a>
            与
            <a class="text-#565656 opacity-80" :href="privacyUrl" target="_blank">《隐私政策》</a>
          </span>
        </el-checkbox>
      </el-form-item>
      <el-form-item class="mt-20px">
        <el-button
          class="w-full"
          type="primary"
          :loading="isLoading"
          @click="handleSubmit"
        >
          {{ isBinding ? '绑定' : '登录/注册' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import type { Rules } from '@vuejs-repo/core'
import { useValidators } from '@vuejs-repo/core/composables/useValidators'
import { useCaptcha } from '@vuejs-repo/core'
import { promiseTimeout } from '@vueuse/core'

const props = withDefaults(defineProps<{
  isBinding?: boolean
  showAgreement?: boolean
  agreementUrl?: string
  privacyUrl?: string
  sendCaptcha: (phoneNumber: string) => Promise<void>
  login: (phoneNumber: string, captcha: string) => Promise<void>
  bindPhone?: (phoneNumber: string, captcha: string) => Promise<void>
}>(), {
  isBinding: false,
  showAgreement: true,
  agreementUrl: '#',
  privacyUrl: '#',
})

const emit = defineEmits<{
  ok: []
}>()

const { isRequired, isPhoneNumber, isCaptcha: isCaptchaRule } = useValidators()

const formRef = ref<FormInstance>()
const isLoading = ref(false)

const formState = reactive({
  model: {
    phoneNumber: '',
    captcha: '',
    agreed: false,
  },
  rules: {
    phoneNumber: [isRequired({ label: '手机号' }), isPhoneNumber()],
    captcha: [isRequired({ label: '验证码' }), isCaptchaRule()],
  } as Rules,
})

const captcha = useCaptcha({
  validate: async () => {
    await formRef.value?.validateField('phoneNumber')
  },
  request: async () => {
    await props.sendCaptcha(formState.model.phoneNumber)
    ElMessage.success('验证码发送成功')
  },
})

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  if (props.showAgreement && !formState.model.agreed) {
    ElMessage.error('请同意《服务协议》与《隐私政策》')
    return
  }

  isLoading.value = true
  try {
    if (props.isBinding && props.bindPhone) {
      await props.bindPhone(formState.model.phoneNumber, formState.model.captcha)
      ElMessage.success('绑定成功')
    } else {
      await props.login(formState.model.phoneNumber, formState.model.captcha)
      ElMessage.success('登录成功')
    }
    emit('ok')
    await promiseTimeout(500)
    resetForm()
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  formState.model.phoneNumber = ''
  formState.model.captcha = ''
  formState.model.agreed = false
  captcha.reset()
}
</script>
