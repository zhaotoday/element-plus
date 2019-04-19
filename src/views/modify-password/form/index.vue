<template>
  <div
    class="limit-width"
    style="width: 400px;">
    <Form
      ref="formValidate"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="100">
      <Form-item
        label="旧密码"
        prop="oldPassword">
        <Input
          v-model="cForm.formValidate.oldPassword"
          placeholder="" />
      </Form-item>
      <Form-item
        label="新密码"
        prop="password">
        <Input
          v-model="cForm.formValidate.password"
          placeholder="输入新密码，密码由6-16个字符组成，区分大小写" />
      </Form-item>
      <Form-item
        label="确认新密码"
        prop="confirmPassword">
        <Input
          v-model="cForm.formValidate.confirmPassword"
          placeholder="" />
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
