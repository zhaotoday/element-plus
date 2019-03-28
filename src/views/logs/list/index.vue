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
            <Form-item prop="startTime">
              <DatePicker
                :value="cList.cSearch.where.startTime.$eq"
                type="date"
                placeholder="请选择起始时间"
                style="width: 220px"
                @on-change="v => { handleDatePickerChange('startTime', v) }" />
            </Form-item>
            <Form-item prop="endTime">
              <DatePicker
                :value="cList.cSearch.where.endTime.$eq"
                type="date"
                placeholder="请选择结束时间"
                style="width: 220px"
                @on-change="v => { handleDatePickerChange('endTime', v) }" />
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
  startTime: {
    $eq: ''
  },
  endTime: {
    $eq: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS, MODELS, REQUEST_METHODS } = this.$consts

    return {
      cList: {
        columns: [
          {
            title: '用户',
            key: 'managerId',
            width: LIST_COLUMN_WIDTHS.USER
          },
          {
            title: '模型',
            key: 'model',
            width: 150,
            render: (h, params) => h('span', null, MODELS[params.row.model])
          },
          {
            title: '操作类型',
            type: 'method',
            width: 150,
            render: (h, params) => h('span', null, REQUEST_METHODS[params.row.method])
          },
          {
            title: '数据',
            key: 'body',
            render: (h, params) => h('span', null, JSON.stringify(params.row.body))
          },
          {
            title: '操作',
            key: 'action',
            width: 105,
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
    handleDatePickerChange (k, v) {
      this.cList.cSearch.where[k].$eq = v
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
