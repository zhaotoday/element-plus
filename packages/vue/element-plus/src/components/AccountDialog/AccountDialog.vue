<template>
  <el-dialog
    v-model="visible"
    title="短信登录/注册"
    :lock-scroll="false"
    width="430px"
    :z-index="2000"
    destroy-on-close
  >
    <div class="h-260px">
      <PhoneLoginForm
        :is-binding="isBinding"
        :show-agreement="showAgreement"
        :agreement-url="agreementUrl"
        :privacy-url="privacyUrl"
        :send-captcha="sendCaptcha"
        :login="smsLogin"
        :bind-phone="bindPhone"
        @ok="handleOk"
      />
    </div>
    <div v-if="showWxLogin" class="w-320px mx-auto">
      <el-divider content-position="center">其他方式登录</el-divider>
      <div
        class="w-84px mx-auto cursor-pointer hover:opacity-80"
        @click="openWxLogin"
      >
        <div class="relative w-36px h-36px mx-auto rounded-full bg-#07c160">
          <i class="i-carbon-logo-wechat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-24px text-white" />
        </div>
        <div class="pt-10px leading-100% text-12px text-center">
          微信登录/注册
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { v4 as uuid } from 'uuid'
import PhoneLoginForm from './PhoneLoginForm.vue'

const props = withDefaults(defineProps<{
  isBinding?: boolean
  showAgreement?: boolean
  agreementUrl?: string
  privacyUrl?: string
  showWxLogin?: boolean
  sendCaptcha: (phoneNumber: string) => Promise<void>
  smsLogin: (phoneNumber: string, captcha: string) => Promise<void>
  bindPhone?: (phoneNumber: string, captcha: string) => Promise<void>
  getQrConnectUrl: (clientId: string) => Promise<string>
  wxWebLogin: (code: string) => Promise<void>
}>(), {
  isBinding: false,
  showAgreement: true,
  agreementUrl: '#',
  privacyUrl: '#',
  showWxLogin: true,
})

const emit = defineEmits<{
  ok: []
}>()

const visible = ref(false)
const clientId = ref(uuid())
let loginUrl = ''

async function fetchLoginUrl() {
  if (loginUrl) return
  loginUrl = await props.getQrConnectUrl(clientId.value)
}

function openCenteredWindow(url: string, title: string, width: number, height: number) {
  const screenLeft = window.screenLeft ?? window.screenX
  const screenTop = window.screenTop ?? window.screenY
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height
  const left = (screenWidth - width) / 2 + screenLeft
  const top = (screenHeight - height) / 2 + screenTop
  const features = `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}, resizable=yes`
  const win = window.open(url, title, features)
  win?.focus()
}

async function openWxLogin() {
  await fetchLoginUrl()
  if (loginUrl) {
    openCenteredWindow(loginUrl, '微信登录/注册', 510, 510)
  }
}

async function handleMessage(event: MessageEvent) {
  const data = event.data as { event?: string; payload?: { code?: string; state?: string } }
  if (data?.event !== 'login:success') return

  const { code, state } = data.payload ?? {}
  if (!code || state !== clientId.value) return

  await props.wxWebLogin(code)
  handleOk()
}

function handleOk() {
  visible.value = false
  emit('ok')
}

function show() {
  visible.value = true
  clientId.value = uuid()
  loginUrl = ''
}

function hide() {
  visible.value = false
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

defineExpose({ show, hide })
</script>
