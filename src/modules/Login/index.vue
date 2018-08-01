<template>
  <Card class="login" dis-hover>
    <p slot="title">后台管理系统</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" label-position="left">
      <Form-item label="用户" prop="username">
        <Input size="large" v-model="formValidate.username" placeholder="请输入用户" @on-enter="handleLogin"></Input>
      </Form-item>
      <Form-item label="密码" prop="password">
        <Input size="large" type="password" v-model="formValidate.password" placeholder="请输入密码" @on-enter="handleLogin"></Input>
      </Form-item>
      <Form-item>
        <Button size="large" type="primary" @click="handleLogin">登录</Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
  import auth from '@/utils/auth'
  import Model from '@/models/actions/login'

  export default {
    name: 'login',
    data () {
      return {
        formValidate: {
          username: 'admin',
          password: '123456'
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: '用户不能为空'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空'
            }
          ]
        }
      }
    },
    methods: {
      handleLogin () {
        this.$refs.formValidate.validate(async valid => {
          if (valid) {
            const res = await new Model().POST({
              body: this.formValidate
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

<style lang="scss" scoped src="./styles/index.scss">
</style>
