<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item href="/articles">文章列表</Breadcrumb-item>
      <Breadcrumb-item>{{ id ? '编辑' : '新增' }}</Breadcrumb-item>
    </Breadcrumb>
    <div class="limit-width">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题" prop="title">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="内容" prop="content">
          <Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>
          <Input v-model="formValidate.content" style="display: none;"></Input>
        </Form-item>
        <Form-item label="文件" prop="content">
          <Uploader></Uploader>
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
  import Uploader from '@/components/Uploader'

  export default {
    name: 'form',
    components: {
      Editor,
      Uploader
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
      get (id) {
        this.$store.dispatch('getArticle', {id})
      },
      handleEditorChange (html) {
        this.$set(this.formValidate, 'content', html)
      },
      handleSave () {
        this.$refs.formValidate.validate(async valid => {
          if (valid) {
            const {id, formValidate} = this
            const action = id ? 'putArticle' : 'postArticle'

            await this.$store.dispatch(action, {
              id,
              body: formValidate
            })

            this.$Message.success((this.id ? '编辑' : '新增') + '成功！')
            !id && this.resetFields()
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
          this.$set(this, 'formValidate', newVal)
          this.$refs.editor.html(newVal.content)
        }
      }
    }
  }
</script>
