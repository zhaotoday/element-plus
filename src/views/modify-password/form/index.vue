<template>
  <div>
    <Form
      ref="formValidate"
      class="c-form"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="100">
      <Form-item
        label="旧密码"
        prop="oldPassword">
        <Input
          type="password"
          v-model="cForm.formValidate.oldPassword"
          placeholder="请输入旧密码"
          style="width: 320px;" />
      </Form-item>
      <Form-item
        label="新密码"
        prop="password">
        <Input
          type="password"
          v-model="cForm.formValidate.password"
          placeholder="请输入新密码"
          style="width: 320px;" />
      </Form-item>
      <Form-item
        label="确认新密码"
        prop="confirmPassword">
        <Input
          type="password"
          v-model="cForm.formValidate.confirmPassword"
          placeholder="请确认新密码"
          style="width: 320px;" />
      </Form-item>
      <Form-item class="save">
        <Button
          type="primary"
          @click="handleSave"
          class="u-mr5">
          确认
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import formMixin from '@/mixins/form'

const module = 'managers'

export default {
  mixins: [
    formMixin
  ],
  data () {
    return {
      cForm: {
        formValidate: {},
        ruleValidate: {
          oldPassword: [
            {
              required: true,
              message: '旧密码不能为空'
            }
          ],
          password: [
            {
              required: true,
              message: '新密码不能为空'
            }
          ],
          confirmPassword: [
            {
              required: true,
              message: '确认新密码不能为空'
            }
          ]
        }
      }
    }
  },
  methods: {
    handleSave () {
      const { oldPassword, password, confirmPassword } = this.cForm.formValidate

      if (password !== confirmPassword) {
        this.$Message.error('两次密码输入不一致')
        return
      }

      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(`${module}/postAction`, {
            body: {
              type: 'MODIFY_PASSWORD',
              oldPassword,
              password
            }
          })
          this.$Message.success('修改成功')
        }
      })
    }
  }
}
</script>
