<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">设置</Breadcrumb-item>
      <Breadcrumb-item href="#">网站设置</Breadcrumb-item>
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
        <Form-item label="关键词" prop="keywords">
          <Row>
            <Col span="12">
              <Input type="textarea" :rows="4" v-model="formValidate.keywords" placeholder="请输入关键词"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="描述" prop="description">
          <Row>
            <Col span="12">
              <Input type="textarea" :rows="4" v-model="formValidate.description" placeholder="请输入描述"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="固定电话" prop="cellphone">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.cellphone" placeholder="请输入固定电话"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="手机号" prop="telephone">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.telephone" placeholder="请输入手机号"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="地址" prop="address">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.address" placeholder="请输入地址"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="版权信息" prop="copyright">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.copyright" placeholder="请输入版权信息"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="备案号" prop="icp">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.icp" placeholder="请输入备案号"></Input>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="公众号二维码" prop="oa_qrcode">
          <Uploader key="0" v-if="id && !formValidate.oa_qrcode" @change="handleOAUploaderChange"></Uploader>
          <Uploader key="1" v-if="id && formValidate.oa_qrcode" v-model="formValidate.oa_qrcode"
                    @change="handleOAUploaderChange"></Uploader>
          <Uploader key="2" v-if="!id" @change="handleOAUploaderChange"></Uploader>
          <Input v-model="formValidate.oa_qrcode" style="display: none;"></Input>
        </Form-item>
        <Form-item label="App 二维码" prop="app_qrcode">
          <Uploader key="3" v-if="id && !formValidate.app_qrcode"
                    @change="handleAppUploaderChange"></Uploader>
          <Uploader key="4" v-if="id && formValidate.app_qrcode" v-model="formValidate.app_qrcode"
                    @change="handleAppUploaderChange"></Uploader>
          <Uploader key="5" v-if="!id" @change="handleAppUploaderChange"></Uploader>
          <Input v-model="formValidate.app_qrcode" style="display: none;"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSave" class="margin-right-sm">保存</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Uploader from '@/components/Uploader'

  export default {
    name: 'form',
    components: { Uploader },
    created () {
      this.id = 1
      this.getDetails(this.id)
    },
    data () {
      return {
        id: '',
        formValidate: {
          title: '',
          keywords: '',
          description: '',
          cellphone: '',
          telephone: '',
          address: '',
          copyright: '',
          icp: '',
          oa_qrcode: '',
          app_qrcode: ''
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
          ]
        }
      }
    },
    methods: {
      getDetails (id) {
        return this.$store.dispatch('getSetting', { id })
      },
      handleOAUploaderChange (file) {
        this.formValidate.oa_qrcode = file ? file.id : ''
      },
      handleAppUploaderChange (file) {
        this.formValidate.app_qrcode = file ? file.id : ''
      },
      handleSave () {
        this.$refs.formValidate.validate(async valid => {
          if (valid) {
            const { id, formValidate } = this

            await this.$store.dispatch('putSetting', {
              id,
              body: formValidate
            })

            this.$Message.success('保存成功！')
          }
        })
      }
    },
    computed: mapState([
      'settings'
    ]),
    watch: {
      'settings.setting': {
        handler (newVal) {
          const { title, keywords, description, cellphone, telephone, address, copyright, icp, oa_qrcode, app_qrcode } = newVal

          this.formValidate = {
            title,
            keywords,
            description,
            cellphone,
            telephone,
            address,
            copyright,
            icp,
            oa_qrcode,
            app_qrcode
          }
        }
      }
    }
  }
</script>
