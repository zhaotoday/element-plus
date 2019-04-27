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
            <Form-item prop="subjectId">
              <Select
                v-model="cList.cSearch.where.subjectId.$eq"
                placeholder="请选择主题"
                clearable
                filterable>
                <Option
                  v-for="item in allSurveySubjectsList.items"
                  :value="item.id"
                  :key="item.id">{{ item.title }}</Option>
              </Select>
            </Form-item>
            <Form-item prop="startTime">
              <DatePicker
                :value="cList.cSearch.where.startTime.$eq"
                type="date"
                placeholder="请选择起始时间"
                style="width: 190px"
                @on-change="v => { handleDatePickerChange('startTime', v) }" />
            </Form-item>
            <Form-item prop="endTime">
              <DatePicker
                :value="cList.cSearch.where.endTime.$eq"
                type="date"
                placeholder="请选择结束时间"
                style="width: 190px"
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
    <Modal
      v-model="cDetail.modal"
      title="详情">
      <Card
        v-if="cDetail.value.length"
        style="margin-bottom: 15px;">
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
import Model from '@/models/admin/survey-subjects'

const module = 'surveyResults'
const initWhere = {
  subjectId: {
    $eq: ''
  },
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
    const { LIST_COLUMN_WIDTHS } = this.$consts

    return {
      allSurveySubjectsList: {},
      cDetail: {
        modal: false,
        value: []
      },
      cList: {
        columns: [
          {
            title: '用户',
            key: 'wxUserId',
            width: 200,
            render: (h, params) => {
              return h('CWXUserInfo', {
                attrs: {
                  id: params.row.wxUserId
                }
              })
            }
          },
          {
            title: '主题',
            key: 'subjectId',
            render: (h, params) => {
              const { items } = this.allSurveySubjectsList
              const { subjectId } = params.row

              return h('span', null, this.$helpers.getItemById(items, subjectId)['title'])
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
    this.allSurveySubjectsList = await this.getAllSurveySubjectsList()
    this.getList()
    next()
  },
  async created () {
    this.initSearchWhere(initWhere)
    this.allSurveySubjectsList = await this.getAllSurveySubjectsList()
    this.getList()
  },
  methods: {
    async getAllSurveySubjectsList () {
      const { data } = await new Model().GET({
        query: {
          offset: 0,
          limit: -1,
          where: {
            alias: this.alias || ''
          }
        }
      })

      return data
    },
    getCategoryTitleById (id, hasParent = false) {
      const item = this.$helpers.getItemById(this.allCategoriesList.items, id)

      return item && item.name
        ? hasParent
          ? `${this.getCategoryTitleById(item.parentId)} - ${item.name}`
          : item.name
        : ''
    },
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
