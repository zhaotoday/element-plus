<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item href="/articles">文章列表</Breadcrumb-item>
      <Breadcrumb-item>文章{{ id ? '编辑' : '新增' }}</Breadcrumb-item>
    </Breadcrumb>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题" prop="title">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.title" placeholder="请输入标题" />
            </Col>
          </Row>
        </Form-item>
        <Form-item label="内容" prop="content">
          <Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>
          <Input v-model="formValidate.content" style="display: none;" />
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSave" class="margin-right-sm">保存</Button>
          <Button type="ghost" @click="$router.push('/articles')">返回</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Editor from '@/components/Editor'

  export default {
    name: 'form',
    components: {
      Editor
    },
    created () {
      this.id = this.$route.params.id
      this.id && this.get(this.id)
    },
    data () {
      return {
        id: '',
        formValidate: {
          title: '',
          content: ''
        },
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
          content: [
            {
              required: true,
              message: '内容不能为空'
            },
            {
              max: 2000,
              message: '内容长度过长'
            }
          ]
        }
      }
    },
    methods: {
      get (uri) {
        this.$store.dispatch('getArticle', {uri})
      },
      handleEditorChange (html) {
        this.$set(this.formValidate, 'content', html)
      },
      handleSave () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            const action = this.id ? 'putArticle' : 'postArticle'
            const uri = this.id

            this.$store.dispatch(action, {
              uri,
              data: this.formValidate
            }).then(() => {
              this.$Message.success((this.id ? '编辑' : '新增') + '成功！')
              !this.id && this.resetFields()
            })
          }
        })
      },
      resetFields () {
        this.$refs.formValidate.resetFields()
        this.$refs.editor.html('')
      }
    },
    computed: mapState([
      'articles'
    ]),
    watch: {
      'articles.article': {
        handler (newVal) {
          this.$set(this, 'formValidate', newVal.data)
          this.$refs.editor.html(newVal.data.content)
        }
      }
    }
  }
</script>
