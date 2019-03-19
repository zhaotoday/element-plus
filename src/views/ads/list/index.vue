<template>
  <div class="p-ads">
    <CList
      :columns="cList.columns"
      :data="list.items"
      :total="list.total"
      :pageCurrent="listPageCurrent">
      <CListHeader>
        <CListOperations>
          <Button
            class="u-mr5"
            type="primary"
            @click="handleShowPost">
            新增
          </Button>
        </CListOperations>
      </CListHeader>
    </CList>
    <Modal
      width="280"
      v-model="cDel.modal"
      title="请确认"
      @on-ok="handleDelOk">
      <p>确认删除？</p>
    </Modal>
    <Modal
      width="500"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'">
      <Form
        ref="formValidate"
        :model="cForm.formValidate"
        :rules="cForm.ruleValidate"
        :label-width="80">
        <Form-item
          label="标题"
          prop="title">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.title"
                placeholder="请输入标题" />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="链接"
          prop="link">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.link"
                placeholder="请输入链接" />
            </Col>
          </Row>
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
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cForm.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="handleFormOk">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'
import formMixin from '@/mixins/form'

const module = 'ads'

export default {
  mixins: [
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    return {
      cList: {
        columns: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '图片',
            key: 'picture',
            width: 200,
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: this.$helpers.getFileURLById(params.row.picture),
                  class: 'pb-picture'
                }
              })
            }
          },
          {
            title: '链接',
            key: 'link',
            width: 300
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
            render: (h, params) => h('ButtonGroup', [
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowPut(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowDel(params.row.id)
                  }
                }
              }, '删除'),
              h('Button', {
                on: {
                  click: async () => {
                    await this.$store.dispatch(`${module}/postAction`, {
                      query: { where: { ...this.listSearchWhere, alias: this.alias } },
                      body: { type: 'TO_PREV', id: params.row.id }
                    })

                    this.getList()
                  }
                }
              }, '上移'),
              h('Button', {
                on: {
                  click: async () => {
                    await this.$store.dispatch(`${module}/postAction`, {
                      query: { where: { ...this.listSearchWhere, alias: this.alias } },
                      body: { type: 'TO_NEXT', id: params.row.id }
                    })

                    this.getList()
                  }
                }
              }, '下移')
            ])
          }
        ]
      },
      cDel: {
        id: 0,
        modal: false
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: {},
        ruleValidate: {
          title: [
            {
              required: true,
              message: '标题不能为空'
            }
          ],
          code: [
            {
              required: true,
              message: '代码不能为空'
            }
          ]
        }
      }
    }
  },
  computed: mapState({
    list: state => state[module].list
  }),
  watch: {
    'cForm.modal': {
      handler (newVal) {
        !newVal && this.resetFields()
      }
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.getList()
    next()
  },
  async created () {
    this.getList()
  },
  methods: {
    getList () {
      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: { alias: this.alias }
        }
      })
    },
    handleShowPost () {
      this.cForm.id = 0
      this.cForm.modal = true
    },
    handleShowPut (detail) {
      this.cForm.id = detail.id
      this.cForm.modal = true
      this.initFields(detail)
    },
    handleShowDel (id) {
      this.cDel.id = id
      this.cDel.modal = true
    },
    async handleDelOk () {
      await this.$store.dispatch(`${module}/del`, { id: this.cDel.id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    handleFormOk () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(this.cForm.id ? `${module}/put` : `${module}/post`, {
            id: this.cForm.id,
            body: {
              ...this.cForm.formValidate,
              alias: this.alias
            }
          })

          this.cForm.modal = false
          this.$Message.success((this.cForm.id ? '编辑' : '新增') + '成功！')
          !this.cForm.id && this.resetSearch()
          this.getList()
        }
      })
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
