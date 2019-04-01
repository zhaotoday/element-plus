<template>
  <div class="limit-width" style="width: 400px;">
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
import { mapState } from 'vuex'
import formMixin from '@/mixins/form'

const module = 'settings'

export default {
  mixins: [
    formMixin
  ],
  data () {
    return {
      cForm: {
        formValidate: {},
        ruleValidate: {
          title: [
            {
              required: true,
              message: '标题不能为空'
            }
          ]
        }
      }
    }
  },
  computed: mapState({
    detail: state => state[module].detail
  }),
  created () {
    this.id = 1
    this.getDetail(module, this.id)
  },
  methods: {
    handleSave () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          const id = this.id
          await this.$store.dispatch(`${module}/put`, {
            id,
            body: {
              ...this.cForm.formValidate,
              alias: this.alias
            }
          })
          this.$Message.success('保存成功')
        }
      })
    }
  }
}
</script>
