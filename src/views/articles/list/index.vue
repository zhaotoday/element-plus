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
            class="margin-right-sm"
            type="primary"
            @click="$router.push(`${alias}/articles/index/form`)">
            新增
          </Button>
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="category_id">
              <Categories
                :alias="alias"
                v-model="cList.cSearch.where.category_id.$eq"
                @on-change="handleCategoryChange" />
            </Form-item>
            <Form-item prop="title">
              <Input
                type="text"
                placeholder="请输入标题"
                v-model="cList.cSearch.where.title.$like"
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
    <Modal
      width="280"
      v-model="cDel.modal"
      title="请确认"
      @on-ok="handleDelOk">
      <p>确认删除？</p>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Categories from '@/components/Categories'
import allCategoriesListMixin from '@/mixins/allCategoriesList'
import routeParamsMixin from '@/mixins/routeParams'
import listMixin from '@/mixins/list'
import formMixin from '@/mixins/form'
import CList, { CListHeader, CListOperations, CListSearch } from '@/components/list'

const module = 'articles'
const initWhere = {
  attr: {
    $eq: ''
  },
  category_id: {
    $eq: ''
  },
  title: {
    $like: ''
  }
}

export default {
  components: {
    CList,
    CListHeader,
    CListOperations,
    CListSearch,
    Categories
  },
  mixins: [
    allCategoriesListMixin,
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    return {
      cList: {
        columns: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '分类',
            key: 'category_id',
            width: 180,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.category_id))
          },
          {
            title: '发布时间',
            key: 'created_at',
            width: 180,
            render: (h, params) => h('span', null, this.$time.getTime(params.row.created_at))
          },
          {
            title: '操作',
            key: 'action',
            width: 520,
            render: (h, params) => {
              return h('ButtonGroup', [
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.$router.push(`${this.routePrefix}/articles/index/form/${params.row.id}`)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.handleShowDel(params.row.id)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
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
                  props: {
                    type: 'ghost'
                  },
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
          }
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        }
      },
      cDel: {
        id: 0,
        modal: false
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
    handleShowDel (id) {
      this.cDel.id = id
      this.cDel.modal = true
    },
    async handleDelOk () {
      await this.$store.dispatch(`${module}/del`, { id: this.cDel.id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    handleCategoryChange (value) {
      this.cList.cSearch.where.category_id.$eq = value
    }
  }
}
</script>
