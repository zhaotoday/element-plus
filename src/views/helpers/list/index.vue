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
            @click="$router.push(`/${alias}/helpers/index/form`)">
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
import routeParamsMixin from '@/mixins/route-params'
import allCategoriesListMixin from '@/mixins/all-categories-list'
import listMixin from '@/mixins/list'

const module = 'helpers'
const initWhere = {
  categoryId: {
    $eq: ''
  },
  title: {
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
            title: '标题',
            key: 'title'
          },
          {
            title: '分类',
            key: 'categoryId',
            width: 180,
            render: (h, params) => h('span', null, this.getCategoryTitleById(params.row.categoryId, true))
          },
          {
            title: '内容',
            key: 'content',
            width: 350
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
            width: 260,
            render: (h, params) => h('ButtonGroup', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/${this.alias}/helpers/index/form/${params.row.id}`)
                  }
                }
              }, '编辑'),
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowDel(params.row.id)
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
    }
  }
}
</script>
