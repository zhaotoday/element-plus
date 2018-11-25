<template>
  <Card
    class="p-login"
    dis-hover>
    <p slot="title">后台管理系统</p>
    <Form
      class="pb-form"
      ref="formValidate"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="90"
      label-position="left">
      <Form-item
        label="手机号"
        prop="telephone">
        <Input
          size="large"
          v-model="cForm.formValidate.telephone"
          placeholder="请输入手机号"
          @on-enter="handleLogin" />
      </Form-item>
      <Form-item
        class="pb-get-checkcode__wrap"
        label="短信验证码"
        prop="check_code">
        <Input
          size="large"
          v-model="cForm.formValidate.check_code"
          placeholder="请输入短信验证码"
          @on-enter="handleLogin" />
        <div
          class="pb-get-checkcode"
          :class="cCheckCode.disabled ? 'is-disabled' : ''"
          @click="handleGetCheckCode">
          {{ cCheckCode.message }}
        </div>
      </Form-item>
      <Form-item>
        <Button
          size="large"
          type="primary"
          @click="handleLogin">
          登录
        </Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
import auth from '@/utils/auth'
import Model from '@/models/actions/login'

export default {
  data () {
    return {
      cForm: {
        formValidate: {},
        ruleValidate: {
          telephone: [
            {
              required: true,
              message: '手机号不能为空'
            }
          ],
          check_code: [
            {
              required: true,
              message: '短信验证码不能为空'
            }
          ]
        }
      },
      cCheckCode: {
        disabled: false,
        message: '获取短信验证码'
      }
    }
  },
  methods: {
    async getCheckCode (telephone) {
      const staffsPostActionRes = await this.$store.dispatch('staffs/postAction', {
        body: {
          type: 'GET_CHECK_CODE',
          telephone
        }
      })

      return staffsPostActionRes.data.check_code
    },
    async handleGetCheckCode () {
      if (this.cCheckCode.disabled) {
        return
      }

      const { telephone } = this.cForm.formValidate

      if (!telephone) {
        this.$Message.error('手机号不能为空')
        return
      }

      await this.getCheckCode(telephone)

      const TOTAL_SECONDS = 60
      let i = 0

      this.cCheckCode.disabled = true
      this.cCheckCode.message = `${TOTAL_SECONDS} 秒后重新获取`

      this.checkCodeTimer = setInterval(() => {
        this.cCheckCode.message = `${TOTAL_SECONDS - ++i} 秒后重新获取`

        if (TOTAL_SECONDS === i) {
          clearInterval(this.checkCodeTimer)

          this.cCheckCode.disabled = false
          this.cCheckCode.message = '获取短信验证码'
        }
      }, 1000)
    },
    handleLogin () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          const res = await new Model().POST({
            body: {
              type: 'LOGIN',
              ...this.cForm.formValidate
            }
          })

          auth.login(res.data)
          this.$Message.success('登录成功')
          this.$router.push(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
