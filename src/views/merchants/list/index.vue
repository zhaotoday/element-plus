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
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk" />
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
            title: '名称',
            key: 'name',
            width: 200
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
            title: '备注',
            key: 'remark'
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
                    this.handleCheck(row.id, value)
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
    async handleCheck (id, value) {
      await this.$store.dispatch(`${module}/put`, {
        id,
        body: { status: value }
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
