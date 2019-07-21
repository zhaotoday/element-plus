<template>
  <div class="p-ads">
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
          <Button
            type="primary"
            @click="cSendForm.modal = true">
            发放
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk" />
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
          label="类型"
          prop="type">
          <Row>
            <Col span="20">
              <Select
                v-model="cForm.formValidate.type"
                style="width: 320px;">
                <Option
                  v-for="item in $consts.COUPON_TYPES"
                  :key="item.value"
                  :value="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="价值"
          prop="value">
          <Row>
            <Col span="20">
              <InputNumber
                :min="0"
                :max="100000"
                v-model="cForm.formValidate.value" />
              元
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="最低消费"
          prop="value">
          <Row>
            <Col span="20">
              <InputNumber
                :min="0"
                :max="100000"
                v-model="cForm.formValidate.minPrice" />
              元
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="起始时间"
          prop="startsAt">
          <DatePicker
            :value="cForm.formValidate.startsAt"
            type="date"
            placeholder="请选择起始时间"
            style="width: 320px"
            @on-change="v => { handleDatePickerChange('startsAt', v) }" />
        </Form-item>
        <Form-item
          label="结束时间"
          prop="endsAt">
          <DatePicker
            :value="cForm.formValidate.endsAt"
            type="date"
            placeholder="请选择结束时间"
            style="width: 320px"
            @on-change="v => { handleDatePickerChange('endsAt', v) }" />
        </Form-item>
        <Form-item
          v-show="cForm.formValidate.type === 'DESIGNATED_PRODUCT'"
          label="指定商品"
          prop="productId">
          <Row>
            <Col span="20">
              <CProductSelect
                v-if="cForm.modal"
                :value="cForm.formValidate.productId"
                @change="value => { cForm.formValidate.productId = value }"
              />
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
    <Modal
      width="500"
      v-model="cSendForm.modal"
      title="发放优惠券">
      <Form
        ref="sendFormValidate"
        :model="cSendForm.formValidate"
        :rules="cSendForm.ruleValidate"
        :label-width="80">
        <Form-item
          label="发放对象"
          prop="wxUserIds">
          <Row>
            <Col span="20">
              <CWxUserSelect
                v-if="cSendForm.modal"
                multiple
                @change="value => { cSendForm.formValidate.wxUserIds = value }"
              />
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cSendForm.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="send">
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

const module = 'coupons'
const initForm = {
  status: 1,
  type: 'SUBTRACTION',
  value: 0,
  minPrice: 0
}
const initSendForm = {
  wxUserIds: []
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
            title: '标题',
            key: 'title'
          },
          {
            type: 'type',
            title: '类型',
            width: 90,
            render: (h, params) => h('span', null, this.$helpers.getItem(this.$consts.COUPON_TYPES, 'value', params.row.type)['label'])
          },
          {
            title: '价值',
            key: 'value',
            width: 100,
            render: (h, params) => h('span', null, `${params.row.value} 元`)
          },
          {
            title: '最低消费',
            key: 'minPrice',
            width: 100,
            render: (h, params) => h('span', null, `${params.row.minPrice} 元`)
          },
          {
            title: '有效期',
            width: 200,
            render: (h, params) => {
              let ret = ''

              const { startsAt, endsAt } = params.row

              if (startsAt && endsAt) {
                ret += `${startsAt} 至 ${endsAt}`
              } else if (startsAt) {
                ret += `${startsAt} 开始`
              } else if (endsAt) {
                ret += `${endsAt} 结束`
              }

              return h('span', null, ret)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 240,
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
              }, '删除'),
              h('CDropdown', {
                attrs: {
                  title: '排序',
                  options: this.$consts.ORDER_ACTIONS
                },
                on: {
                  click: async value => {
                    this.handleSort(params.row.id, value)
                  }
                }
              })
            ])
          }
        ]
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: this.$helpers.deepCopy(initForm),
        ruleValidate: {
          title: [
            {
              required: true,
              message: '标题不能为空'
            }
          ],
          type: [
            {
              required: true,
              message: '类型不能为空'
            }
          ],
          link: [
            {
              required: true,
              message: '链接不能为空'
            }
          ],
          picture: [
            {
              required: true,
              message: '图片不能为空'
            }
          ]
        }
      },
      cSendForm: {
        modal: false,
        formValidate: this.$helpers.deepCopy(initSendForm),
        ruleValidate: {
          wxUserIds: [
            {
              required: true,
              message: '请选择用户'
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
          where: { alias: this.alias }
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
    async handleChangeStatus (id, value) {
      await this.$store.dispatch(`${module}/put`, {
        id,
        body: { status: value }
      })

      this.$Message.success('修改状态成功')
      this.getList()
    },
    async handleSort (id, value) {
      await this.$store.dispatch(`${module}/postAction`, {
        query: { where: { ...this.listSearchWhere, alias: this.alias } },
        body: { type: value, id }
      })

      this.getList()
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
    },
    send () {
      this.$refs.sendFormValidate.validate(async valid => {
        if (valid) {
          const { wxUserIds } = this.cSendForm.formValidate

          await this.$store.dispatch(`${module}/postAction`, {
            body: {
              type: 'SEND',
              wxUserIds,
              couponIds: this.listSelectedItems.map(item => item.id)
            }
          })

          this.$Message.success('发放成功')
          this.getList()

          this.cSendForm.modal = false
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
