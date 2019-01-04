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
        label="内容"
        prop="content">
        <Editor
          ref="editor"
          v-model="cForm.formValidate.content"
          @change="value => { handleEditorChange('content', value) }" />
        <Input
          v-model="cForm.formValidate.content"
          style="display: none;" />
      </Form-item>
      <Form-item
        label="分类"
        prop="category_id">
        <Categories
          :alias="alias"
          v-model="cForm.formValidate.category_id"
          @on-change="value => { cForm.formValidate.category_id = value }" />
      </Form-item>
      <Form-item
        label="封面"
        prop="picture">
        <Uploader
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
        <Button
          type="ghost"
          @click="id ? $helpers.goBack() : $router.push(`${routePrefix}/articles/index`)">
          返回
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Editor from '@/components/Editor'
  import Uploader from '@/components/Uploader'
  import Categories from '@/components/Categories'
  import routeParamsMixin from '@/mixins/routeParams'
  import formMixin from '@/mixins/form'

  const module = 'articles'

  export default {
    components: {
      Editor,
      Uploader,
      Categories
    },
    mixins: [
      routeParamsMixin,
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
              },
              {
                max: 100,
                message: '标题不能多于 100 个字'
              }
            ],
            category_id: [
              {
                required: true,
                message: '请选择分类'
              }
            ],
            picture: [
              {
                required: true,
                message: '请上传封面'
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
