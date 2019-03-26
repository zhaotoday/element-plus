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
              <DatePicker
                :value="cList.cSearch.where.createdAt.$between"
                type="daterange"
                placement="bottom-end"
                split-panels
                placeholder="请选择起始和结束时间"
                style="width: 220px"
                @on-change="handleDatePickerChange" />
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

const module = 'logs'
const initWhere = {
  createdAt: {
    $between: null
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { MODELS, REQUEST_METHODS } = this.$consts

    return {
      cList: {
        columns: [
          {
            title: '用户',
            key: 'managerId'
          },
          {
            title: '模型',
            key: 'model',
            render: (h, params) => h('span', null, MODELS[params.row.model])
          },
          {
            title: '操作类型',
            type: 'method',
            render: (h, params) => h('span', null, REQUEST_METHODS[params.row.method])
          },
          {
            title: '数据',
            key: 'body',
            width: 250,
            render: (h, params) => h('span', null, JSON.stringify(params.row.body))
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
            render: (h, params) => h('div', [
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
    handleDatePickerChange (v) {
      this.cList.cSearch.where.createdAt.$between = v
    },
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
