<template>
  <div>
    <Form
      ref="formValidate"
      class="c-form"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="100">
      <Form-item
        label="名称"
        prop="name">
        <Input
          v-model="cForm.formValidate.name"
          placeholder="请输入名称"
          style="width: 320px;"
        />
      </Form-item>
      <Form-item
        label="手机号"
        prop="phoneNumber">
        <Input
          v-model="cForm.formValidate.phoneNumber"
          placeholder="请输入手机号"
          style="width: 320px;"
        />
      </Form-item>
      <Form-item
        label="密码"
        prop="_password">
        <Input
          type="password"
          v-model="cForm.formValidate._password"
          placeholder="请输入密码（编辑时，留空则不更改原密码）"
          style="width: 320px;"
        />
      </Form-item>
      <Form-item
        label="产地"
        prop="productPlace">
        <Input
          v-model="cForm.formValidate.productPlace"
          placeholder="请输入产地"
          style="width: 320px;"
        />
      </Form-item>
      <Form-item
        label="负责人"
        prop="leader">
        <Input
          v-model="cForm.formValidate.leader"
          placeholder="请输入负责人"
          style="width: 320px;"
        />
      </Form-item>
      <Form-item
        label="介绍"
        prop="introduction">
        <CEditor
          ref="editor"
          v-model="cForm.formValidate.introduction"
          @change="value => { handleEditorChange('introduction', value) }" />
        <Input
          v-model="cForm.formValidate.introduction"
          style="display: none;"
        />
      </Form-item>
      <Form-item class="save">
        <Button
          type="primary"
          @click="save"
          class="u-mr5">
          保存
        </Button>
        <Button @click="id ? $helpers.goBack() : $router.push(`/${alias}/suppliers/index`)">
          返回
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import formMixin from '@/mixins/form'

const module = 'suppliers'

export default {
  mixins: [
    routeParamsMixin,
    formMixin
  ],
  data () {
    return {
      cForm: {
        formValidate: {},
        ruleValidate: {
          name: [
            {
              required: true,
              message: '名称不能为空'
            }
          ],
          phoneNumber: [
            {
              required: true,
              message: '手机号不能为空'
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '手机号格式错误'
            }
          ],
          _password: [
            {
              min: 6,
              message: '密码必须大于 6 位'
            }
          ]
        }
      }
    }
  },
  computed: mapState({
    detail: state => state[module].detail
  }),
  watch: {
    detail: {
      handler (newVal) {
        this.$set(this.cForm, 'formValidate', newVal)
        this.$refs.editor.html(newVal.content)
      }
    }
  },
  async created () {
    this.id && this.getDetail(module, this.id)
  },
  methods: {
    save () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          let { id, _password, ...rest } = this.cForm.formValidate

          id = id || this.id

          await this.$store.dispatch(`${module}/${id ? 'put' : 'post'}`, {
            id,
            body: _password
              ? {
                ...rest,
                password: _password,
                alias: this.alias
              }
              : {
                ...rest,
                alias: this.alias
              }
          })
          this.$Message.success((id ? '编辑' : '新增') + '成功！')
          if (!id) {
            this.resetFields()
            this.$refs.editor.html('')
          }
        }
      })
    }
  }
}
</script>
