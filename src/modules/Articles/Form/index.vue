<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item href="/articles/index">文章列表</Breadcrumb-item>
      <Breadcrumb-item>{{ id ? '编辑' : '新增' }}</Breadcrumb-item>
    </Breadcrumb>
    <div class="limit-width">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-item label="标题" prop="title">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="分类" prop="category_id">
          <Select v-model="formValidate.category_id" placeholder="请选择分类" clearable style="width: 200px;">
            <Option v-for="item in categories.categories.items" :value="item.id" :key="item.id">
              {{ item.title }}
            </Option>
          </Select>
        </Form-item>
        <Form-item label="封面" prop="picture">
          <Uploader key="0" v-if="id && !formValidate.picture" ref="uploader" @change="handleUploaderChange"></Uploader>
          <Uploader key="1" v-if="id && formValidate.picture" ref="uploader" v-model="formValidate.picture"
                    @change="handleUploaderChange"></Uploader>
          <Uploader key="2" v-if="!id" ref="uploader" @change="handleUploaderChange"></Uploader>
          <Input v-model="formValidate.picture" style="display: none;"></Input>
        </Form-item>
        <Form-item label="内容" prop="content">
          <Editor ref="editor" v-model="formValidate.content" @change="handleEditorChange"></Editor>
          <Input v-model="formValidate.content" style="display: none;"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSave" class="margin-right-sm">保存</Button>
          <Button type="ghost" @click="$router.push('/articles/index')">返回</Button>
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
    async created () {
      this.id = this.$route.params.id
      await this.getCategoryItems()
      this.id && this.getDetails(this.id)
    },
    data () {
      return {
        id: '',
        formValidate: {
          title: '',
          content: '',
          category_id: '',
          picture: ''
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
              max: 2000,
              message: '内容长度过长'
            }
          ]
        }
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getArticle', { id })
      },
      getCategoryItems () {
        return this.$store.dispatch('getCategories', {
          query: {}
        })
      },
      handleEditorChange (html) {
        this.formValidate.content = html
      },
      handleUploaderChange (file) {
        this.formValidate.picture = file ? file.id : ''
      },
      handleSave () {
        this.$refs.formValidate.validate(async valid => {
          if (valid) {
            const { id, formValidate } = this
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
        this.$refs.uploader.remove()
      }
    },
    computed: mapState([
      'articles',
      'categories'
    ]),
    watch: {
      'articles.article': {
        handler (newVal) {
          const { title, category_id, picture, content } = newVal

          this.formValidate = { title, category_id, picture, content }
          this.$refs.editor.html(newVal.content)
        }
      }
    }
  }
</script>
