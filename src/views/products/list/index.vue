<template>
  <div>
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere">
      <CListHeader>
        <CListOperations>
          <Button
            class="u-mr5"
            type="primary"
            @click="$router.push(`/${alias}/products/index/form`)">
            新增
          </Button>
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="categoryId">
              <CCategories
                :alias="alias"
                v-model="cList.cSearch.where.categoryId.$eq"
                @on-change="value => { cList.cSearch.where.categoryId.$eq = value }" />
            </Form-item>
            <Form-item prop="name">
              <Input
                type="text"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
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
import allCategoriesListMixin from '@/mixins/all-categories-list'
import listMixin from '@/mixins/list'

const module = 'products'
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
    return {
      cList: {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '分类',
            key: 'categoryId',
            width: 180,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.categoryId, true))
          },
          {
            title: '价格',
            width: 100,
            render: (h, params) => h('span', null, params.row.price + ' 元')
          },
          {
            title: '市场价',
            width: 100,
            render: (h, params) => h('span', null, params.row.marketPrice + ' 元')
          },
          {
            title: '库存',
            width: 100,
            render: (h, params) => h('span', null, params.row.stock + ' 件')
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
            width: 290,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/${this.alias}/products/index/form/${params.row.id}`)
                  }
                }
              }, '编辑'),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(params.row.id)
                  }
                }
              }, '删除'),
              h('Button', {
                on: {
                  click: async () => {
                    await this.$store.dispatch(`${module}/postAction`, {
                      query: { where: { ...this.listSearchWhere, alias: this.alias } },
                      body: { type: 'TO_PREV', id: params.row.id }
                    })

                    this.getList()
                  }
                }
              }, '上移'),
              h('Button', {
                on: {
                  click: async () => {
                    await this.$store.dispatch(`${module}/postAction`, {
                      query: { where: { ...this.listSearchWhere, alias: this.alias } },
                      body: { type: 'TO_NEXT', id: params.row.id }
                    })

                    this.getList()
                  }
                }
              }, '下移')
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
    }
  }
}
</script>
