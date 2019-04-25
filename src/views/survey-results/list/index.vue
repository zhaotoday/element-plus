<template>
  <div>
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere">
    </CList>
    <Modal
      v-model="cDetail.modal"
      title="详情">
      <Card v-if="cDetail.value.length" style="margin-bottom: 15px;">
        <p slot="title">{{ cDetail.value | find | title }}</p>
        <p>{{ cDetail.value | find | value | filter | join }}</p>
      </Card>
      <Card v-if="cDetail.value.length">
        <p slot="title">{{ cDetail.value | last | title }}</p>
        <p>{{ cDetail.value | last | value | string }}</p>
      </Card>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'

const module = 'surveyResults'
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
      cDetail: {
        modal: false,
        value: []
      },
      cList: {
        columns: [
          {
            title: '用户',
            key: 'wxUserId',
            width: 200
          },
          {
            title: '主题',
            key: 'subjectId',
            render: (h, params) => {
              const title = ({
                1: '问卷调查 1',
                2: '问卷调查 2'
              })[params.row.subjectId]

              return h('span', null, title)
            }
          },
          {
            title: '提交时间',
            key: 'createdAt',
            width: LIST_COLUMN_WIDTHS.CREATED_AT,
            render: (h, params) => h('span', null, this.$time.getTime(params.row.createdAt))
          },
          {
            title: '操作',
            key: 'action',
            width: 105,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.cDetail.modal = true
                    this.cDetail.value = params.row.value
                  }
                }
              }, '详情')
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
  filters: {
    find (items) {
      return items.find(item => item.selected)
    },
    filter (items) {
      return items.filter(item => item.selected)
    },
    title (item) {
      return item.title
    },
    value (item) {
      return item.value
    },
    join (items) {
      return items.map(item => item.label).join('、')
    },
    last (items) {
      return items[items.length - 1]
    },
    string (item) {
      return item[0]
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
          where: { ...this.listSearchWhere, alias: this.alias }
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
