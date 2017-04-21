<template>
  <Card class="login" dis-hover>
    <p slot="title">后台管理系统</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60" label-position="left">
      <Form-item label="用户" prop="username">
        <Input v-model="formValidate.username" placeholder="请输入用户"></Input>
      </Form-item>
      <Form-item label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="handleSubmit('formValidate')">登陆</Button>
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
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: '用户不能为空',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      /**
       * 提交
       */
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._login()
          }
        })
      },

      /**
       * 登陆
       */
      _login () {
        return new Model().POST({
          data: this.formValidate
        }).then((res) => {
          auth.login(res.token)
          this.$router.push(this.$route.query.redirect || '/')
          this.$Message.success('登陆成功')
        })
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
