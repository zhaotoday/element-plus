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
            @click="$router.push(`${routePrefix}/articles/index/form`)">
            新增
          </Button>
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="attr">
              <Select
                v-model="cList.cSearch.where.attr.$eq"
                placeholder="请选择属性"
                clearable
                style="width: 220px;">
                <Option
                  v-for="(item, index) in Object.keys($consts.ARTICLE_ATTRS)"
                  :value="item"
                  :key="index">
                  {{ $consts.ARTICLE_ATTRS[item] }}
                </Option>
              </Select>
            </Form-item>
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
    <Modal
      width="280"
      v-model="cAttr.modal"
      title="请确认"
      @on-ok="handlePutAttr">
      <p>{{ attrTip }}</p>
    </Modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Categories from '@/components/Categories'
  import routeParamsMixin from '@/mixins/routeParams'
  import allCategoriesListMixin from '@/mixins/allCategoriesList'
  import listMixin from '@/mixins/list'
  import formMixin from '@/mixins/form'
  import CList, { CListHeader, CListOperations, CListSearch, CListNavigation } from '@/components1/List'

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
      CListNavigation,
      Categories
    },
    mixins: [
      routeParamsMixin,
      allCategoriesListMixin,
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
                const isHomeAd = params.row.is_home_ad === 1
                const isCategoryTop = params.row.is_category_top === 1

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
                          query: { where: this.searchWhere },
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
                          query: { where: this.searchWhere },
                          body: { type: 'TO_NEXT', id: params.row.id }
                        })

                        this.getList()
                      }
                    }
                  }, '下移'),
                  h('Button', {
                    props: {
                      type: 'ghost'
                    },
                    on: {
                      click: () => {
                        this.$set(this, 'cAttr', {
                          id: params.row.id,
                          which: 'is_home_ad',
                          modal: true,
                          value: isHomeAd ? 0 : 1
                        })
                      }
                    }
                  }, isHomeAd ? '取消设为首页广告' : '设为首页广告'),
                  h('Button', {
                    props: {
                      type: 'ghost'
                    },
                    on: {
                      click: () => {
                        this.$set(this, 'cAttr', {
                          id: params.row.id,
                          which: 'is_category_top',
                          modal: true,
                          value: isCategoryTop ? 0 : 1
                        })
                      }
                    }
                  }, isCategoryTop ? '取消设为分类头条' : '设为分类头条')
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
        },
        cAttr: {
          id: 0,
          which: '',
          value: 0,
          modal: false
        }
      }
    },
    computed: {
      ...mapState({
        list: state => state[module].list
      }),
      attrTip () {
        return this.cAttr.which === 'is_home_ad'
          ? this.cAttr.value === 1
            ? '确认设为首页广告？'
            : '确认取消设为首页广告？'
          : this.cAttr.value === 1
            ? '确认设为分类头条？'
            : '确认取消设为分类头条？'
      },
      searchWhere () {
        const attrWhere = {}
        const { attr, ...otherWheres } = this.listSearchWhere || {}

        if (attr && attr.$eq) {
          attrWhere[attr.$eq] = { $eq: 1 }
        }

        return {
          ...attrWhere,
          ...otherWheres,
          alias: this.alias
        }
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
      async handlePutAttr () {
        const { which, value, id } = this.cAttr
        const actionType = which === 'is_category_top'
          ? value === 1
            ? 'SET_CATEGORY_TOP'
            : 'CANCEL_CATEGORY_TOP'
          : value === 1
            ? 'SET_HOME_AD'
            : 'CANCEL_HOME_AD'

        await this.$store.dispatch(`${module}/postAction`, {
          body: { type: actionType, id }
        })

        this.$Message.success('设置成功！')
        this.getList()
      },
      getList () {
        return this.$store.dispatch(`${module}/getList`, {
          query: {
            offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
            limit: this.$consts.PAGE_SIZE,
            where: this.searchWhere
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
