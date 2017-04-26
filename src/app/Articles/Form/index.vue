<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="#">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章新增</Breadcrumb-item>
    </Breadcrumb>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题" prop="title">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="内容" prop="content">
          <Editor v-model="formValidate.content" @change="handleEditorChange"></Editor>
          <Input v-model="formValidate.content" style="display: none;"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit" class="margin-right-sm">保存</Button>
          <Button type="primary" @click="handleSubmitAndGoBack" class="margin-right-sm">保存并返回</Button>
          <Button type="ghost" @click="$router.push('/articles')">返回</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
  import Editor from '@/components/Editor'

  export default {
    name: 'form',
    components: {
      Editor
    },
    data () {
      return {
        formValidate: {
          title: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {
              required: true,
              message: '标题不能为空'
            }
          ],
          content: [
            {
              required: true,
              message: '内容不能为空'
            }
          ]
        }
      }
    },
    methods: {
      _submit () {
        return new Promise((resolve, reject) => {
          this.$refs.formValidate.validate((valid) => {
            if (valid) {
              this.$store.dispatch('postArticle', {
                data: this.formValidate
              }).then(() => {
                this.$Message.success('新增成功！')
                this.$refs.formValidate.resetFields()
                resolve()
              })
            }
          })
        })
      },
      handleSubmit () {
        this._submit()
      },
      handleSubmitAndGoBack () {
        this._submit().then(() => {
          this.$router.push('/articles')
        })
      },
      handleEditorChange (html) {
        this.$set(this.formValidate, 'content', html)
      }
    }
  }
</script>
