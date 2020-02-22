<template>
  <div class="p-merchants">
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere"
      @selection-change="handleListSelectionChange">
      <CListHeader>
        <CListOperations>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk"
          />
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="name">
              <Input
                type="text"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
                style="width: 190px;"
              />
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

const module = 'merchants'
const initWhere = {
  name: {
    $like: ''
  },
  status: {
    $eq: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { STATUSES } = this.$consts

    return {
      cList: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '店铺照片',
            key: 'picture',
            width: 120,
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
            title: '商家名称',
            key: 'name'
          },
          {
            title: '联系人',
            key: 'contactName',
            width: 100
          },
          {
            title: '手机号',
            key: 'phoneNumber',
            width: 130
          },
          {
            title: '收货地址',
            key: 'address',
            width: 300
          },
          {
            title: '送货时间',
            key: 'deliveryTime',
            width: 150
          },
          {
            title: '员工代码',
            key: 'staffNo',
            width: 100
          },
          {
            title: '状态',
            width: 130,
            render: (h, { row }) => h('span', null, this.$helpers.getItem(this.$consts.STATUSES, 'value', row.wxUser.merchantStatus)['label'])
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            render: (h, { row }) => h('div', [
              h('CDropdown', {
                attrs: {
                  title: '审核',
                  options: STATUSES.filter(item => item.value !== 'CHECKING')
                },
                on: {
                  click: async value => {
                    this.handleCheck(row, value)
                  }
                }
              }),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(row.id)
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
          where: this.listSearchWhere
        }
      })
    },
    async handleDelOk (id) {
      await this.$store.dispatch(`${module}/del`, { id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    async handleCheck (row, value) {
      await this.$store.dispatch(`${module}/put`, {
        body: {
          wxUserId: row.wxUserId,
          merchantStatus: value
        }
      })

      if (value === 'PASSED') {
        this.$Message.success('通过成功')
      } else {
        this.$Message.success('拒绝成功')
      }

      this.getList()
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
