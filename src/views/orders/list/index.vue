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
                style="width: 220px;" />
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
      width="280"
      v-model="cDel.modal"
      title="请确认"
      @on-ok="handleDelOk">
      <p>确认删除？</p>
    </Modal>
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
    return {
      cList: {
        columns: [
          {
            title: '订单号',
            key: 'id'
          },
          {
            title: '下单会员',
            key: 'wxUserId',
            width: 180
          },
          {
            title: '支付金额',
            key: 'payMoney',
            width: 100,
            render: (h, params) => h('span', null, params.row.payMoney + ' 元')
          },
          {
            title: '支付时间',
            key: 'paidAt',
            width: 120
          },
          {
            title: '状态',
            key: 'status',
            width: 100
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
            render: (h, params) => h('ButtonGroup', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/${this.alias}/orders/index/form/${params.row.id}`)
                  }
                }
              }, '编辑'),
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowDel(params.row.id)
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
      cDel: {
        id: 0,
        modal: false
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
          where: { ...this.listSearchWhere, alias: this.alias }
        }
      })
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
    }
  }
}
</script>
