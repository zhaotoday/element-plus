<template>
  <div class="limit-width">
    <Form
      ref="formValidate"
      :model="cForm.formValidate"
      :rules="cForm.ruleValidate"
      :label-width="100">
      <Form-item
        label="名称"
        prop="name">
        <Input
          v-model="cForm.formValidate.name"
          placeholder="请输入名称" />
      </Form-item>
      <Form-item
        label="分类"
        prop="categoryId">
        <CCategories
          :alias="alias"
          v-model="cForm.formValidate.categoryId"
          @on-change="value => { cForm.formValidate.categoryId = value }" />
      </Form-item>
      <Form-item
        label="价格"
        prop="price">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.formValidate.price" />
        元
      </Form-item>
      <Form-item
        label="市场价"
        prop="price">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.formValidate.marketPrice" />
        元
      </Form-item>
      <Form-item
        label="库存"
        prop="stock">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.formValidate.stock" />
        件
      </Form-item>
      <Form-item
        label="详情"
        prop="content">
        <CEditor
          ref="editor"
          v-model="cForm.formValidate.content"
          @change="value => { handleEditorChange('content', value) }" />
        <Input
          v-model="cForm.formValidate.content"
          style="display: none;" />
      </Form-item>
      <Form-item
        label="图片"
        prop="picture">
        <CUploader
          ref="uploader"
          :has-default-file="!!cForm.formValidate.picture"
          v-model="cForm.formValidate.picture"
          @change="value => { handleUploaderChange('picture', value) }" />
      </Form-item>
      <Form-item class="save">
        <Button
          type="primary"
          @click="handleSave"
          class="margin-right-sm">
          保存
        </Button>
        <Button @click="id ? $helpers.goBack() : $router.push(`/${alias}/products/index`)">
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

const module = 'products'

export default {
  mixins: [
    routeParamsMixin,
    formMixin
  ],
  data () {
    return {
      cForm: {
        formValidate: {
          price: 0,
          marketPrice: 0,
          stock: 0
        },
        ruleValidate: {
          name: [
            {
              required: true,
              message: '名称不能为空'
            }
          ],
          categoryId: [
            {
              required: true,
              message: '请选择分类'
            }
          ],
          picture: [
            {
              required: true,
              message: '请上传图片'
            }
          ],
          content: [
            {
              required: true,
              message: '内容不能为空'
            },
            {
              max: 50000,
              message: '内容长度过长'
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
    handleSave () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          const id = this.id
          await this.$store.dispatch(`${module}/${id ? 'put' : 'post'}`, {
            id,
            body: {
              ...this.cForm.formValidate,
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
