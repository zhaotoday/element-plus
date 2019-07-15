<template>
  <div>
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere">
      <CListHeader>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'

const module = 'orders'
const initWhere = {
  id: {
    $like: ''
  }
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
            title: '支付金额',
            key: 'paidMoney',
            width: 100,
            render: (h, params) => h('span', null, params.row.paidMoney + ' 元')
          },
          {
            title: '支付时间',
            key: 'paidAt',
            width: 140,
            render: (h, params) => h('span', null, params.row.paidAt ? this.$time.getTime(params.row.paidAt) : '')
          },
          {
            title: '状态',
            key: 'status',
            width: 100,
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
                    this.$router.push(`/${this.alias}/orders/index/form/${params.row.id}`)
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
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        }
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
    }
  }
}
</script>
