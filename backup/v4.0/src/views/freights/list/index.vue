<template>
  <div class="p-students">
    <CList
      :columns="cList.columns"
      :data="list.items"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      @selection-change="handleListSelectionChange">
      <CListHeader>
        <CListOperations>
          <Button
            type="primary"
            @click="handleShowForm">
            新增
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk"
          />
        </CListOperations>
      </CListHeader>
    </CList>
    <Modal
      width="496"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'">
      <Form
        ref="formValidate"
        :model="cForm.formValidate"
        :rules="cForm.ruleValidate"
        :label-width="80">
        <Form-item
          label="发货地"
          prop="fromAddress">
          <Row>
            <Col span="20">
              <al-selector
                v-model="cForm.formValidate.fromAddress"
                data-type="code"
                :level="1"
              />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="收货地"
          prop="toAddress">
          <Row>
            <Col span="20">
              <al-selector
                v-model="cForm.formValidate.toAddress"
                data-type="code"
                :level="1"
              />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="运费"
          prop="price">
          <Row>
            <Col span="20">
              <InputNumber
                :min="0"
                :max="100000"
                v-model="cForm.formValidate.price"
              />
              元
            </Col>
          </Row>
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
import { pca, pcaa } from 'area-data'

const module = 'freights'
const initForm = {
  fromAddress: [],
  toAddress: [],
  price: 0
}

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
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '发货地',
            width: 200,
            render: (h, { row }) => h('span', null, `${pca['86'][row.fromAddress[0]]}/${pcaa[row.fromAddress[0]][row.fromAddress[1]]}`)
          },
          {
            title: '收货地',
            width: 200,
            render: (h, { row }) => h('span', null, `${pca['86'][row.toAddress[0]]}/${pcaa[row.toAddress[0]][row.toAddress[1]]}`)
          },
          {
            title: '运费',
            render: (h, { row }) => h('span', null, `${row.price} 元`)
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowForm(params.row)
                  }
                }
              }, '编辑'),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        ]
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: this.$helpers.deepCopy(initForm),
        ruleValidate: {}
      }
    }
  },
  computed: mapState({
    list: state => state[module].list
  }),
  watch: {
    'cForm.modal': {
      handler (newVal) {
        !newVal && this.resetFields(initForm)
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
          where: {}
        }
      })
    },
    handleShowForm (detail) {
      this.cForm.modal = true

      if (detail.id) {
        this.cForm.id = detail.id
        this.initFields(detail)
      } else {
        this.cForm.id = 0
      }
    },
    async handleDelOk (id) {
      await this.$store.dispatch(`${module}/del`, { id })
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
