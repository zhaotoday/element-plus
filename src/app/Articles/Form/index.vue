<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="#">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章新增</Breadcrumb-item>
    </Breadcrumb>
    <div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
        ccs
        <Form-item label="标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入用户" @on-enter="handleSubmit"></Input>
        </Form-item>
        dfdsf
        <Form-item>
          <Button type="primary" @click="handleSubmit">登陆</Button>
        </Form-item>
      </Form>aaa
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
          password: 'adminabcdefg123456'
        },
        ruleValidate: {
          title: [
            {
              required: true,
              message: '用户不能为空'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空'
            }
          ]
        }
      }
    },
    methods: {
      handleEditorChange (html) {
        this.$set(this.formValidate, 'username', html)
      }
    }
  }
</script>
