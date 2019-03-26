<template>
  <div class="p-products">
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
    const { ORDER_ACTIONS, PRODUCT_STATUSES } = this.$consts

    return {
      cList: {
        columns: [
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '图片',
            key: 'picture',
            width: 200,
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: this.$helpers.getFileURLById(params.row.pictures),
                  class: 'pb-picture'
                }
              })
            }
          },
          {
            title: '分类',
            key: 'categoryId',
            width: 180,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.categoryId, true))
          },
          {
            title: '价格',
            width: 80,
            render: (h, params) => h('span', null, params.row.price + ' 元')
          },
          {
            title: '进货价',
            width: 80,
            render: (h, params) => h('span', null, params.row.dealerPrice + ' 元')
          },
          {
            title: '库存',
            width: 80,
            render: (h, params) => h('span', null, params.row.stock + ' 件')
          },
          {
            title: '状态',
            width: 80,
            render: (h, params) => h('span', null, this.$helpers.getOption(PRODUCT_STATUSES, params.row.status)['label'])
          },
          {
            title: '发布时间',
            key: 'createdAt',
            width: 150,
            render: (h, params) => h('span', null, this.$time.getTime(params.row.createdAt))
          },
          {
            title: '操作',
            key: 'action',
            width: 340,
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
              h('CDropdown', {
                attrs: {
                  width: 90,
                  title: '修改状态',
                  options: PRODUCT_STATUSES
                },
                on: {
                  click: async value => {
                    await this.$store.dispatch(`${module}/put`, {
                      id: params.row.id,
                      body: { status: value }
                    })

                    this.$Message.success('修改状态成功')
                    this.getList()
                  }
                }
              }),
              h('CDropdown', {
                attrs: {
                  title: '排序',
                  options: ORDER_ACTIONS
                },
                on: {
                  click: async value => {
                    await this.$store.dispatch(`${module}/postAction`, {
                      query: { where: { ...this.listSearchWhere, alias: this.alias } },
                      body: { type: value, id: params.row.id }
                    })

                    this.getList()
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
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
