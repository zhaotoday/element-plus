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
      :label-width="0"
      label-position="left">
      <Form-item prop="username">
        <Input
          v-model="cForm.formValidate.username"
          size="large"
          prefix="md-person"
          placeholder="请输入账号"
          @on-enter="handleLogin" />
      </Form-item>
      <Form-item prop="password">
        <Input
          v-model="cForm.formValidate.password"
          type="password"
          size="large"
          prefix="md-lock"
          placeholder="请输入密码"
          @on-enter="handleLogin" />
      </Form-item>
      <Form-item>
        <Button
          type="primary"
          size="large"
          long
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
          username: [
            {
              required: true,
              message: '账号不能为空'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空'
            }
          ]
        }
      },
      cCheckCode: {
        disabled: false,
        message: '获取密码'
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          const res = await this.$store.dispatch('public/managers/postAction', {
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
