<template>
  <div class="p-categories">
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
            @click="handleShowForm">
            新增
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk" />
          <Button
            v-if="isParent"
            @click="handleGoParent">
            返回上一级
          </Button>
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="name">
              <Input
                type="text"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
                style="width: 190px;" />
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
      <CListNavigation v-if="levels !== 1">
        <Alert v-if="isParent">
          <b>{{ parentDetail.name }}</b> 的子分类：
        </Alert>
        <Alert v-else>
          <b>顶级分类</b> 的子分类
        </Alert>
      </CListNavigation>
    </CList>
    <Modal
      width="496"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'">
      <Form
        ref="formValidate"
        :model="cForm.formValidate"
        :rules="cForm.ruleValidate"
        :label-width="80">
        <Form-item
          v-if="levels !== 1"
          label="父类">
          <Row>
            <Col span="20">
              {{ isParent ? parentDetail.name : '顶级分类'}}
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="名称"
          prop="name">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.name"
                placeholder="请输入名称" />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="图标"
          prop="icon">
          <CUploader
            :has-default-file="!!cForm.formValidate.icon"
            v-model="cForm.formValidate.icon"
            @change="value => { handleUploaderChange('icon', value) }" />
        </Form-item>
        <Form-item
          label="Banner"
          prop="banner">
          <CUploader
            :has-default-file="!!cForm.formValidate.banner"
            v-model="cForm.formValidate.banner"
            @change="value => { handleUploaderChange('banner', value) }" />
        </Form-item>
        <Form-item
          label="描述"
          prop="description">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.description"
                type="textarea"
                :rows="3"
                placeholder="请输入描述" />
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="cForm.modal = false">
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          @click="handleFormOk">
          确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'
import formMixin from '@/mixins/form'

const module = 'categories'
const initWhere = {
  parentIds: [0],
  name: {
    $like: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS, ORDER_ACTIONS, CATEGORY_LEVELS } = this.$consts

    const getLevels = () => {
      return CATEGORY_LEVELS[this.$route.params.alias]
    }

    return {
      parents: [],
      cList: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '图标',
            key: 'icon',
            width: 120,
            render: (h, params) => {
              return params.row.icon
                ? h('img', {
                  attrs: {
                    src: this.$helpers.getFileURLById(params.row.icon),
                    class: 'pb-picture'
                  }
                })
                : h('span', null, '无')
            }
          },
          {
            title: '名称',
            key: 'name',
            minWidth: LIST_COLUMN_WIDTHS.TITLE
          },
          {
            title: '操作',
            key: 'action',
            width: getLevels() === 1 ? 245 : 340,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowForm(params.row)
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
              this.levels === 2 ? h('Button', {
                on: {
                  click: () => {
                    this.handleManageChild(params.row.id)
                  }
                }
              }, '管理子分类') : null,
              h('CDropdown', {
                attrs: {
                  title: '排序',
                  options: ORDER_ACTIONS
                },
                on: {
                  click: async value => {
                    this.handleSort(params.row.id, value)
                  }
                }
              })
            ])
          }
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        }
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: {},
        ruleValidate: {
          name: [
            {
              required: true,
              message: '名称不能为空'
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state[module].list,
      parentDetail: state => state[module].detail
    }),
    levels () {
      return this.$consts.CATEGORY_LEVELS[this.$route.params.alias]
    },
    isParent () {
      const listSearchWhere = this.listSearchWhere

      return listSearchWhere &&
        listSearchWhere.parentIds &&
        listSearchWhere.parentIds[listSearchWhere.parentIds.length - 1] !== 0
    }
  },
  watch: {
    'cForm.modal': {
      handler (newVal) {
        !newVal && this.resetFields()
      }
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.initSearchWhere(initWhere)
    this.getList()
    this.getParentDetail()
    next()
  },
  created () {
    this.$store.dispatch(`${module}/resetList`)
    this.initSearchWhere(initWhere)
    this.getList()
    this.getParentDetail()
  },
  methods: {
    getParentDetail () {
      if (this.listSearchWhere && this.listSearchWhere.parentIds) {
        const id = this.listSearchWhere.parentIds[this.listSearchWhere.parentIds.length - 1]
        id && this.$store.dispatch(`${module}/getDetail`, { id })
      }
    },
    getList () {
      const { name, parentIds = [0] } = this.listSearchWhere || initWhere

      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: {
            parentId: parentIds[parentIds.length - 1],
            name,
            alias: this.alias
          }
        }
      })
    },
    async handleManageChild (id) {
      const parentIds = this.listSearchWhere && this.listSearchWhere.parentIds
        ? this.$helpers.deepCopy(this.listSearchWhere.parentIds)
        : [0]

      if (parentIds[parentIds.length - 1] !== id) {
        parentIds.push(id)
        this.$router.push({
          query: {
            listSearchWhere: JSON.stringify({ ...initWhere, parentIds: parentIds })
          }
        })
      }
    },
    handleGoParent () {
      const parentIds = this.$helpers.deepCopy(this.listSearchWhere.parentIds)

      parentIds.pop()

      this.$router.push({
        query: {
          listSearchWhere: JSON.stringify({ ...initWhere, parentIds })
        }
      })
    },
    handleShowForm (detail) {
      this.cForm.modal = true

      if (detail.id) {
        this.cForm.id = detail.id
        this.initFields(detail)
      } else {
        this.cForm.id = 0
      }
    },
    async handleDelOk (id) {
      await this.$store.dispatch(`${module}/del`, { id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    async handleSort (id, value) {
      const { name } = this.listSearchWhere || initWhere

      await this.$store.dispatch(`${module}/postAction`, {
        query: {
          where: {
            parentId: this.isParent ? this.parentDetail.id : 0,
            name,
            alias: this.alias
          }
        },
        body: { type: value, id }
      })

      this.getList()
    },
    handleFormOk () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(this.cForm.id ? `${module}/put` : `${module}/post`, {
            id: this.cForm.id || '0',
            body: {
              ...this.cForm.formValidate,
              alias: this.alias,
              parentId: this.isParent ? this.parentDetail.id : undefined
            }
          })

          this.cForm.modal = false
          this.$Message.success((this.cForm.id ? '编辑' : '新增') + '成功！')
          !this.cForm.id && this.resetSearch({
            ...initWhere,
            parentIds: this.isParent ? this.listSearchWhere.parentIds : [0]
          })
          this.getList()
        }
      })
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
