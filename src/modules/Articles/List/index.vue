<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章列表</Breadcrumb-item>
    </Breadcrumb>
    <List :current="current" :columns="columns" :data="articles.articles.items" :total="articles.articles.total"
          @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="$router.push(`/${alias}/articles/index/form`)">新增
          </Button>
        </ListOperations>
        <ListSearch>
          <Form inline @submit.native.prevent="handleSearch">
            <Form-item prop="attr">
              <Select v-model="attr.search.which" placeholder="请选择属性" clearable style="width: 220px;">
                <Option v-for="item in attr.options" :value="item.id" :key="item.id">
                  {{ item.title }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="category_id">
              <Select v-model="where.category_id.$eq" placeholder="请选择分类" clearable style="width: 220px;">
                <Option v-for="item in categories.categories.items" :value="item.id" :key="item.id">
                  {{ item.title }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入标题" v-model="where.title.$like" style="width: 220px;"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSearch">查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
    <Modal width="280" v-model="del.modal" title="请确认" @on-ok="handleDelOk">
      <p>确认删除？</p>
    </Modal>
    <Modal width="280" v-model="attr.setting.modal" title="请确认" @on-ok="handleSetAttr">
      <p>{{setAttrTip}}</p>
    </Modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import helpers from 'apples/libs/helpers'
  import time from 'apples/libs/time'
  import ArticleModal from '../../../models/articles'
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'

  export default {
    name: 'list',
    async beforeRouteUpdate (to, from, next) {
      this.alias = to.params.alias
      await this.getCategoryItems()
      this.getItems()
      next()
    },
    async created () {
      this.alias = this.$route.params.alias
      await this.getCategoryItems()
      this.getItems()
    },
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        alias: '',
        attr: {
          search: {
            which: ''
          },
          setting: {
            id: 0,
            which: '',
            modal: false,
            value: ''
          },
          options: [
            {
              id: 'is_category_top',
              title: '是否分类头条'
            },
            {
              id: 'is_home_ad',
              title: '是否首页广告'
            }
          ]
        },
        del: {
          modal: false,
          id: 0
        },
        where: {
          category_id: {
            $eq: ''
          },
          title: {
            $like: ''
          }
        },
        current: 1,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '分类',
            key: 'category_id',
            width: 180,
            render: (h, params) => {
              const { categories } = this.categories

              if (categories) {
                const category = categories.items.find(item => item.id === params.row.category_id)

                return h('span', null, category.title)
              } else {
                return h('span', null, '')
              }
            }
          },
          {
            title: '发布时间',
            key: 'created_at',
            width: 180,
            render (h, params) {
              return h('span', null, time.getDateTime(params.row.created_at + '000'))
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 410,
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
                      this.$router.push(`/${this.alias}/articles/index/form/${params.row.id}`)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.handleDel(params.row.id)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.attr.setting.id = params.row.id
                      this.attr.setting.which = 'is_home_ad'
                      this.attr.setting.modal = true
                      this.attr.setting.value = isHomeAd ? 0 : 1
                    }
                  }
                }, isHomeAd ? '取消设为首页广告' : '设为首页广告'),
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.attr.setting.id = params.row.id
                      this.attr.setting.which = 'is_category_top'
                      this.attr.setting.modal = true
                      this.attr.setting.value = isCategoryTop ? 0 : 1
                    }
                  }
                }, isCategoryTop ? '取消设为分类头条' : '设为分类头条')
              ])
            }
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'articles',
        'categories'
      ]),
      setAttrTip () {
        const { which, value } = this.attr.setting

        if (which === 'is_home_ad') {
          return value === 1 ? '确认设为首页广告？' : '确认取消设为首页广告？'
        } else {
          return value === 1 ? '确认设为分类头条？' : '确认取消设为分类头条？'
        }
      }
    },
    methods: {
      async handleSetAttr () {
        const { which, value } = this.attr.setting
        const actionType = which === 'is_category_top'
          ? value === 1
            ? 'SET_CATEGORY_TOP'
            : 'CANCEL_CATEGORY_TOP'
          : value === 1
            ? 'SET_HOME_AD'
            : 'CANCEL_HOME_AD'

        await new ArticleModal().addPath('actions').POST({
          body: {
            type: actionType,
            id: this.attr.setting.id
          }
        })

        this.$Message.success('设置成功！')
        this.resetSearch()
        this.getItems()
      },
      getItems (current = 1) {
        const attrWhere = this.attr.search.which
          ? { [this.attr.search.which]: { $eq: 1 } }
          : null

        this.current = current

        return this.$store.dispatch('getArticles', {
          query: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            where: Object.assign({
              alias: this.alias
            }, this.where, attrWhere)
          }
        })
      },
      resetSearch () {
        this.where.category_id.$eq = ''
        this.where.title.$like = ''
        this.attr.search.which = ''
      },
      getCategoryItems () {
        return this.$store.dispatch('getCategories', {
          query: {}
        })
      },
      handlePageChange (current) {
        this.getItems(current)
      },
      handleSearch () {
        this.current = 1
        this.getItems()
      },
      handleDel (id) {
        this.del.modal = true
        this.del.id = id
      },
      async handleDelOk () {
        await this.$store.dispatch('deleteArticle', {
          id: this.del.id
        })
        this.$Message.success('删除成功！')
        // iView.Spin 的坑，调用 iView.Spin.hide()，500ms 后实例才被销毁
        await helpers.sleep(500)
        this.resetSearch()
        this.getItems()
      }
    }
  }
</script>
