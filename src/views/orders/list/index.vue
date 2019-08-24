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
            v-if="listSearchWhere.status.$eq === 'TO_DELIVER'"
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
            <Form-item prop="payWay">
              <Select
                placeholder="请选择支付方式"
                clearable
                style="width: 190px"
                v-model="cList.cSearch.where.payWay.$eq">
                <Option
                  v-for="item in $consts.PAY_WAYS"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="startTime">
              <DatePicker
                :value="cList.cSearch.where.startTime.$eq"
                type="datetime"
                placeholder="请选择起始时间"
                style="width: 190px"
                @on-change="v => { handleDatePickerChange('startTime', v) }" />
            </Form-item>
            <Form-item prop="endTime">
              <DatePicker
                :value="cList.cSearch.where.endTime.$eq"
                type="datetime"
                placeholder="请选择结束时间"
                style="width: 190px"
                @on-change="v => { handleDatePickerChange('endTime', v) }" />
            </Form-item>
            <Form-item prop="id">
              <Input
                type="text"
                placeholder="请输入订单号"
                v-model="cList.cSearch.where.no.$like"
                style="width: 190px;" />
            </Form-item>
            <Form-item>
              <Button
                type="primary"
                @click="search">
                查询
              </Button>
            </Form-item>
            <FormItem v-if="listSearchWhere.status.$eq === 'IN_DELIVER'">
              <Button
                type="primary"
                @click="showPrintPreviewer">
                打印订单
              </Button>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                @click="showOrderProducts">
                订单商品统计
              </Button>
            </FormItem>
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
              {{ `${product.name} x${product.number}` }}
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
        <template v-if="cDetail.item.deliverer">
          <Form-item label="配送员">
            {{ cDetail.item.deliverer.nickName }}
          </Form-item>
          <Form-item label="配送员手机号">
            {{ cDetail.item.deliverer.phoneNumber }}
          </Form-item>
        </template>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cDetail.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="cDetail.modal = false">
          确定
        </Button>
      </div>
    </Modal>
    <Modal
      width="840"
      v-model="cPrintPreviewer.modal"
      title="打印订单">
      <div class="c-orders-wrap">
        <ul
          v-if="cPrintPreviewer.modal"
          id="printJS-form"
          class="c-orders">
          <li
            v-for="item in cPrintPreviewer.items"
            :key="item.id"
            class="c-orders__item">
            <h2 class="c-orders__title">福菜生鲜商城购物凭证</h2>
            <ul class="c-orders__user">
              <li class="is-user">客户：{{ item.address.name }}</li>
              <li class="is-tel">
                联系电话：{{ item.address.phoneNumber }}
              </li>
              <li class="is-address">地址：{{ item.address.location.name + item.address.room }}</li>
              <li style="text-align: right;">订单号：{{ item.no }}</li>
            </ul>
            <table class="c-orders__table">
              <tr>
                <th style="width: 250px;">商品</th>
                <th style="width: 70px;">单价</th>
                <th style="width: 70px;">数量</th>
                <th style="width: 70px;">金额</th>
                <th>备注</th>
              </tr>
              <tr style="height: 120px;">
                <td>

                  <div class="cc-products__wrap">
                    <ul class="cc-products">
                      <li
                        v-for="product in item.products"
                        :key="product.id"
                        class="cc-products__item">
                        <template v-if="product.price">
                          <div class="grid">
                            <div class="is-name">{{ product.name }}</div>
                            <div class="is-price">{{ product.price }}</div>
                            <div class="is-number">{{ product.number }}</div>
                            <div class="is-total">{{ product.price * product.number }}</div>
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="specification in product.specifications"
                            :key="specification.value"
                            class="grid">
                            <div class="is-name">
                              {{ `${product.name}（${specification.price} 元 / ${specification.label}）` }}
                            </div>
                            <div class="is-price">{{ specification.price }}</div>
                            <div class="is-number">{{ specification.number }}</div>
                            <div class="is-total">{{ (specification.price * specification.number).toFixed(2) }}</div>
                          </div>
                        </template>
                      </li>
                    </ul>
                  </div>

                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-if="false">
                <td
                  colspan="2"
                  style="text-align: right;">
                  合计
                </td>
                <td>d</td>
                <td>e</td>
                <td>e</td>
              </tr>
              <tr>
                <td colspan="3">
                  合计：{{ item.paidMoney }} 元（{{ $helpers.getItem($consts.PAY_WAYS, 'value', item.payWay)['label'] }}）
                </td>
                <td colspan="2">
                  单位：福州福菜农业发展有限公司
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  电话：13799985235
                </td>
              </tr>
            </table>
            <ul class="c-orders__user">
              <li class="is-user">
                配送员：{{ item.deliverer ? item.deliverer.nickName : '' }}
              </li>
              <li class="is-tel">
                联系电话：{{ item.deliverer ? item.deliverer.phoneNumber : '' }}
              </li>
              <li class="is-address"></li>
              <li style="text-align: right;"></li>
            </ul>
            <div class="c-orders__remark">1{{ item.remark }}</div>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cPrintPreviewer.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="print">
          打印
        </Button>
      </div>
    </Modal>
    <Modal
      width="840"
      v-model="cOrderProducts.modal"
      title="订单商品统计">
      <Table
        size="small"
        border
        stripe
        highlight-row
        height="400"
        :columns="cOrderProducts.columns"
        :data="cOrderProducts.data">
      </Table>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import allCategoriesListMixin from '@/mixins/all-categories-list'
import listMixin from '@/mixins/list'
import Print from 'print-js'
import OrdersModel from '@/models/admin/orders'

const module = 'orders'
const initWhere = {
  no: {
    $like: ''
  },
  payWay: {
    $eq: ''
  },
  status: {
    $eq: ''
  },
  startTime: {
    $eq: ''
  },
  endTime: {
    $eq: ''
  }
}
const initForm = {
  delivererId: ''
}

export default {
  mixins: [
    routeParamsMixin,
    allCategoriesListMixin,
    listMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS } = this.$consts

    return {
      cList: {
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        },
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
            width: 255,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.showDetail(params.row)
                  }
                }
              }, '详情'),
              h('Button', {
                attrs: {
                  disabled: params.row.status !== 'IN_DELIVER'
                },
                on: {
                  click: () => {
                    this.cPrintPreviewer.modal = true
                    this.cPrintPreviewer.items = [params.row]
                  }
                }
              }, '打印订单'),
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
      },
      cPrintPreviewer: {
        modal: false,
        items: []
      },
      cSearch: {
        where: this.$helpers.deepCopy(initWhere)
      },
      cOrderProducts: {
        modal: false,
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '分类',
            width: 180,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.categoryId, true))
          },
          {
            title: '价格',
            width: 80,
            render: (h, params) => h('span', null, params.row.price ? `${params.row.price} 元` : '')
          },
          {
            title: '数量',
            key: 'number',
            align: 'right',
            width: 180,
            render: (h, params) => h(
              'span',
              null,
              params.row.number
                ? `x${params.row.number}`
                : params.row.specifications.map(item => h('div', null, `（${item.price} 元 / ${item.label}） x${item.number}`))
            )
          }
        ],
        data: []
      }
    }
  },
  computed: mapState({
    list: state => state[module].list
  }),
  watch: {
    'cPrintPreviewer.modal': {
      handler (newVal) {
        if (!newVal) {
          this.cPrintPreviewer.items = []
        }
      }
    }
  },
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
    handleDatePickerChange (k, v) {
      this.cList.cSearch.where[k].$eq = v
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
      Print({
        printable: 'printJS-form',
        type: 'html',
        targetStyles: ['*']
      })
    },
    async getSearchedOrderListItems () {
      this.search()

      const { data: { items } } = await new OrdersModel().GET({
        query: {
          where: this.listSearchWhere,
          offset: 0,
          limit: 1000
        }
      })

      return items
    },
    async showPrintPreviewer () {
      const items = this.listSelectedItems.length
        ? this.listSelectedItems
        : await this.getSearchedOrderListItems()

      if (items.length) {
        this.cPrintPreviewer.items = items
        this.cPrintPreviewer.modal = true
      } else {
        this.$Message.error('没有找到可打印订单')
      }
    },
    async showOrderProducts () {
      const items = this.listSelectedItems.length
        ? this.listSelectedItems
        : await this.getSearchedOrderListItems()

      let allProducts = []
      let mergedProducts = []

      items.forEach(item => {
        allProducts = [...allProducts, ...item.products]
      })

      allProducts.forEach(item => {
        const index = mergedProducts.findIndex(product => product.id === item.id)

        if (index === -1) {
          mergedProducts.push(item)
        } else {
          if (item.price) {
            mergedProducts[index].number += item.number
          } else {
            item.specifications.forEach(item => {
              const specificationIndex = mergedProducts[index].specifications.findIndex(specification => specification.value === item.value)
              if (specificationIndex === -1) {
                mergedProducts[index].specifications.push(item)
              } else {
                mergedProducts[index].specifications[specificationIndex].number += item.number
              }
            })
          }
        }
      })

      if (items.length) {
        this.cOrderProducts.data = mergedProducts
        this.cOrderProducts.modal = true
      } else {
        this.$Message.error('没有订单')
      }
    }
  }
}
</script>

<style
  lang="scss"
  src="../styles/index.scss">
</style>
