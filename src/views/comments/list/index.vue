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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'

const module = 'comments'
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
    const { COMMENT_STATUSES, COMMENT_STATUS_ACTIONS } = this.$consts

    return {
      cList: {
        columns: [
          {
            title: '用户',
            key: 'wxUserId',
            width: 150
          },
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '状态',
            key: 'status',
            width: 100,
            render: (h, params) => h('span', null, this.$helpers.getOption(COMMENT_STATUSES, params.row.status)['label'])
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            render: (h, params) => h('div', [
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(params.row.id)
                  }
                }
              }, '删除'),
              h('CDropdown', {
                attrs: {
                  title: '审核',
                  options: COMMENT_STATUS_ACTIONS
                },
                on: {
                  click: async value => {
                    this.handleChangeStatus(params.row.id, value)
                  }
                }
              })
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
          where: { ...this.listSearchWhere, alias: this.alias }
        }
      })
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

      this.$Message.success('审核成功')
      this.getList()
    }
  }
}
</script>
