<script setup lang="ts">
import {
  LoginLayout,
  LoginHeader,
  LoginFooter,
  LoginMain,
} from '@vuejs-repo/element-plus'
import LoginForm from './components/FormDialog.vue'

definePageMeta({
  layout: 'root',
})
</script>

<template>
  <ClientOnly>
    <LoginLayout>
      <template #header>
        <LoginHeader>
          <div class="flex items-center">
            <img
              class="w-40px h-40px"
              src="/static/images/common/logo.png"
              alt=""
            />
            <span class="text-20px font-bold ml-14px">
              福州力软信息科技有限公司管理后台
            </span>
          </div>
        </LoginHeader>
      </template>
      <template #main>
        <LoginMain>
          <LoginForm />
        </LoginMain>
      </template>
      <template #footer>
        <LoginFooter>福州力软信息科技有限公司</LoginFooter>
      </template>
    </LoginLayout>
  </ClientOnly>
</template>
