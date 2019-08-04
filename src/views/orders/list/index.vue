<template>
  <div>
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere"
      @selection-change="handleListSelectionChange">
      <CListHeader>
        <CListOperations>
          <Button
            type="primary"
            @click="handleDispatch">
            配送订单
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk"
          />
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="id">
              <Input
                type="text"
                placeholder="请输入订单号"
                v-model="cList.cSearch.where.id.$like"
                style="width: 190px;" />
            </Form-item>
            <Form-item>
              <Button
                type="primary"
                @click="search">
                查询
              </Button>
            </Form-item>
          </Form>
        </CListSearch>
      </CListHeader>
    </CList>
    <Modal
      width="400"
      v-model="cDispatcherForm.modal"
      title="设置配送员">
      <Form
        ref="formValidate"
        :model="cDispatcherForm.formValidate"
        :rules="cDispatcherForm.ruleValidate"
        :label-width="80">
        <Form-item
          label="配送员"
          prop="delivererId">
          <Row>
            <Col span="20">
              <CWxUserSelect
                v-if="cDispatcherForm.modal"
                @change="value => { cDispatcherForm.formValidate.delivererId = value }"
              />
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cDispatcherForm.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="setDispatcher">
          确定
        </Button>
      </div>
    </Modal>
    <Modal
      width="400"
      v-model="cDetail.modal"
      title="详情">
      <Form
        id="printJS-form"
        class="order-detail"
        :label-width="100">
        <Form-item label="订单号">
          {{ cDetail.item.no }}
        </Form-item>
        <Form-item label="商品">
          <div
            v-for="product in cDetail.item.products"
            :key="product.id">
            <template v-if="product.price">
              {{ `${product.name} x${product.price}` }}
            </template>
            <template v-else>
              <div
                v-for="specification in product.specifications"
                :key="specification.value">
                {{ `${product.name}（${specification.price} 元 / ${specification.label}） x${specification.number}` }}
              </div>
            </template>
          </div>
        </Form-item>
        <Form-item label="支付方式">
          {{ $helpers.getItem(this.$consts.PAY_WAYS, 'value', cDetail.item.payWay)['label'] }}
        </Form-item>
        <Form-item label="支付金额">
          {{ cDetail.item.paidMoney + '元' }}
        </Form-item>
        <Form-item label="下单时间">
          {{ $time.getTime(cDetail.item.createdAt) }}
        </Form-item>
        <Form-item label="收货人">
          {{ cDetail.item.address ? cDetail.item.address.name : '' }}
        </Form-item>
        <Form-item label="手机号">
          {{ cDetail.item.address ? cDetail.item.address.phoneNumber : '' }}
        </Form-item>
        <Form-item label="地址">
          {{
          cDetail.item.address && cDetail.item.address.location
          ? cDetail.item.address.location.name + cDetail.item.address.room
          : ''
          }}
        </Form-item>
        <Form-item label="">
          <Button @click="print">打印订单</Button>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cDispatcherForm.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="setDispatcher">
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
import print from 'print-js'

const module = 'orders'
const initWhere = {
  id: {
    $like: ''
  }
}
const initForm = {
  delivererId: ''
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS } = this.$consts

    return {
      cList: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '订单号',
            key: 'no'
          },
          {
            title: '下单会员',
            key: 'wxUserId',
            width: LIST_COLUMN_WIDTHS.USER,
            render: (h, params) => h('span', null, params.row.wxUser.nickName)
          },
          {
            title: '商品',
            key: 'products',
            width: 260,
            render: (h, params) => h('span', params.row.products.map(product => {
              if (product.price) {
                return h('div', null, `${product.name} x${product.number}`)
              } else {
                return product.specifications.map(specification => {
                  return h('div', null, `${product.name}（${specification.price} 元 / ${specification.label}） x${specification.number}`)
                })
              }
            }))
          },
          {
            title: '支付方式',
            key: 'payWay',
            width: 90,
            render: (h, params) => h('span', null, this.$helpers.getItem(this.$consts.PAY_WAYS, 'value', params.row.payWay)['label'])
          },
          {
            title: '支付金额',
            key: 'paidMoney',
            width: 90,
            render: (h, params) => h('span', null, params.row.paidMoney + ' 元')
          },
          {
            title: '下单时间',
            key: 'createdAt',
            width: 140,
            render: (h, params) => h('span', null, this.$time.getTime(params.row.createdAt))
          },
          {
            title: '配送员',
            key: 'delivererId',
            width: LIST_COLUMN_WIDTHS.USER,
            render: (h, params) => h('span', null, params.row.deliverer ? params.row.deliverer.nickName : '')
          },
          {
            title: '状态',
            key: 'status',
            width: 80,
            render: (h, params) => h('span', null, this.$helpers.getItem(this.$consts.ORDER_STATUSES, 'code', params.row.status)['label'])
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.showDetail(params.row)
                  }
                }
              }, '详情'),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        }
      },
      cDispatcherForm: {
        modal: false,
        formValidate: this.$helpers.deepCopy(initForm),
        ruleValidate: {
          delivererId: [
            {
              required: true,
              message: '请选择用户'
            }
          ]
        }
      },
      cDetail: {
        modal: false,
        item: {}
      }
    }
  },
  computed: mapState({
    list: state => state[module].list
  }),
  async beforeRouteUpdate (to, from, next) {
    this.initSearchWhere(initWhere)
    this.getList()
    next()
  },
  async created () {
    this.initSearchWhere(initWhere)
    this.getList()
  },
  methods: {
    getList () {
      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: this.listSearchWhere || {}
        }
      })
    },
    async handleDelOk (id) {
      await this.$store.dispatch(`${module}/del`, { id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    handleDispatch () {
      if (!this.listSelectedItems.length) {
        this.$Message.error('没有选中记录')
      } else {
        this.cDispatcherForm.modal = true
      }
    },
    setDispatcher () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          const { delivererId } = this.cDispatcherForm.formValidate

          await this.$store.dispatch(`${module}/postAction`, {
            body: {
              type: 'DELIVER',
              delivererId,
              orderIds: this.listSelectedItems.map(item => item.id)
            }
          })

          this.$Message.success('设置成功')
          this.getList()

          this.cDispatcherForm.modal = false
        }
      })
    },
    showDetail (item) {
      this.cDetail.item = item
      this.cDetail.modal = true
    },
    print () {
      print('printJS-form', 'html')
    }
  }
}
</script>
