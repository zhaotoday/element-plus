<template>
  <div class="limit-width">
    <Form
      ref="formValidate"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="100">
      <Form-item
        label="标题"
        prop="title">
        <Input
          v-model="cForm.formValidate.title"
          placeholder="请输入标题" />
      </Form-item>
      <Form-item
        label="关键词"
        prop="keywords">
        <Input
          type="textarea"
          :rows="3"
          v-model="cForm.formValidate.keywords"
          placeholder="请输入关键词" />
      </Form-item>
      <Form-item
        label="描述"
        prop="description">
        <Input
          type="textarea"
          :rows="3"
          v-model="cForm.formValidate.description"
          placeholder="请输入描述" />
      </Form-item>
      <Form-item
        label="固定电话"
        prop="cellphone">
        <Input
          v-model="cForm.formValidate.cellphone"
          placeholder="请输入固定电话" />
      </Form-item>
      <Form-item
        label="手机号"
        prop="telephone">
        <Input
          v-model="cForm.formValidate.telephone"
          placeholder="请输入手机号" />
      </Form-item>
      <Form-item
        label="地址"
        prop="address">
        <Input
          v-model="cForm.formValidate.address"
          placeholder="请输入地址" />
      </Form-item>
      <Form-item
        label="备案号"
        prop="icp">
        <Input
          v-model="cForm.formValidate.icp"
          placeholder="请输入备案号" />
      </Form-item>
      <Form-item class="save">
        <Button
          type="primary"
          @click="handleSave"
          class="margin-right-sm">
          保存
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
