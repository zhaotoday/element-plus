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
            type="primary"
            @click="$router.push(`/${alias}/activities/index/form`)">
            新增
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
            <Form-item prop="categoryId">
              <CCategories
                :alias="alias"
                v-model="cList.cSearch.where.categoryId.$eq"
                select-parent
                @on-change="value => { cList.cSearch.where.categoryId.$eq = value }"
              />
            </Form-item>
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
import allCategoriesListMixin from '@/mixins/all-categories-list'
import listMixin from '@/mixins/list'

const module = 'activities'
const initWhere = {
  categoryId: {
    $eq: ''
  },
  name: {
    $like: ''
  }
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
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '分类',
            key: 'categoryId',
            width: LIST_COLUMN_WIDTHS.CATEGORY,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.categoryId))
          },
          {
            title: '地点',
            key: 'address',
            width: 350
          },
          {
            title: '报名费',
            width: 100,
            render: (h, { row }) => h('span', null, `${row.price} 元`)
          },
          {
            title: '发布时间',
            key: 'createdAt',
            width: 180,
            render: (h, params) => h('span', null, this.$time.getTime(params.row.createdAt))
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/${this.alias}/activities/index/form/${params.row.id}`)
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
    async handleSort (id, value) {
      await this.$store.dispatch(`${module}/postAction`, {
        query: { where: { ...this.listSearchWhere, alias: this.alias } },
        body: { type: value, id }
      })

      this.getList()
    }
  }
}
</script>
