<template>
  <Card class="login" dis-hover>
    <p slot="title">后台管理系统</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" label-position="left">
      <Form-item label="用户" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入用户" @on-enter="handleSubmit"></Input>
      </Form-item>
      <Form-item label="密码" prop="password">
        <Input type="password" v-model="formValidate.password" placeholder="请输入密码" @on-enter="handleSubmit"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit">登陆</Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
  import auth from '@/utils/auth'
  import Model from '@/models/actions'

  export default {
    name: 'login',
    data () {
      return {
        formValidate: {
          username: 'admin',
          password: 'adminabcdefg123456'
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
      /**
       * 提交
       */
      handleSubmit () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            this._login()
          }
        })
      },

      /**
       * 登陆
       */
      _login () {
        return new Model()
          .addPath('login')
          .POST({
            data: this.formValidate
          })
          .then((res) => {
            auth.login(res.data.data)
            this.$router.push('/')
          })
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
