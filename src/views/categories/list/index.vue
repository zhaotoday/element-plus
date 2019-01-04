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
            @click="handleShowPost">
            新增
          </Button>
          <Button
            class="margin-right-sm"
            type="ghost"
            @click="handleGoParent"
            v-if="isParent">
            返回上一级
          </Button>
        </CListOperations>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
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
      <CListNavigation>
        <Alert v-if="isParent">
          <b>{{ parentDetail.title }}</b> 的子分类：
        </Alert>
        <Alert v-else>
          <b>顶级分类</b> 的子分类
        </Alert>
      </CListNavigation>
    </CList>
    <Modal
      width="280"
      v-model="cDel.modal"
      title="请确认"
      @on-ok="handleDelOk">
      <p>确认删除？</p>
    </Modal>
    <Modal
      width="500"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'">
      <Form
        ref="formValidate"
        :model="cForm.formValidate"
        :rules="cForm.ruleValidate"
        :label-width="80">
        <Form-item
          label="父类"
          prop="title">
          <Row>
            <Col span="20">
              {{ isParent ? parentDetail.title : '顶级分类'}}
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="标题"
          prop="title">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.title"
                placeholder="请输入标题" />
            </Col>
          </Row>
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
import routeParamsMixin from '@/mixins/routeParams'
import listMixin from '@/mixins/list'
import formMixin from '@/mixins/form'
import CList, { CListHeader, CListOperations, CListSearch, CListNavigation } from '@/components/list'

const module = 'categories'
const initWhere = {
  parent_ids: [0],
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
    CListNavigation
  },
  mixins: [
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    return {
      parents: [],
      cList: {
        columns: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '操作',
            key: 'action',
            width: 360,
            render: (h, params) => {
              return h('ButtonGroup', [
                h('Button', {
                  props: {
                    type: 'ghost'
                  },
                  on: {
                    click: () => {
                      this.handleShowPut(params.row)
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
                        query: { parent_id: this.isParent ? this.parentDetail.id : 0 },
                        body: {
                          type: 'TO_PREV',
                          id: params.row.id,
                          where: this.where
                        }
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
                        query: { parent_id: this.isParent ? this.parentDetail.id : 0 },
                        body: {
                          type: 'TO_NEXT',
                          id: params.row.id,
                          where: this.where
                        }
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
                      const { id } = params.row

                      const parentIds = this.listSearchWhere && this.listSearchWhere.parent_ids
                        ? this.$helpers.deepCopy(this.listSearchWhere.parent_ids)
                        : [0]

                      if (parentIds[parentIds.length - 1] !== id) {
                        parentIds.push(id)
                        this.$router.push({
                          query: {
                            listSearchWhere: JSON.stringify({ ...initWhere, parent_ids: parentIds })
                          }
                        })
                      }
                    }
                  }
                }, '管理子分类')
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
      cForm: {
        id: 0,
        modal: false,
        formValidate: {},
        ruleValidate: {
          title: [
            {
              required: true,
              message: '标题不能为空'
            },
            {
              max: 100,
              message: '标题不能多于 100 个字'
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
    isParent () {
      const listSearchWhere = this.listSearchWhere

      return listSearchWhere &&
        listSearchWhere.parent_ids &&
        listSearchWhere.parent_ids[listSearchWhere.parent_ids.length - 1] !== 0
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
    this.initSearchWhere(initWhere)
    this.getList()
    this.getParentDetail()
  },
  methods: {
    getParentDetail () {
      if (this.listSearchWhere && this.listSearchWhere.parent_ids) {
        const id = this.listSearchWhere.parent_ids[this.listSearchWhere.parent_ids.length - 1]
        id && this.$store.dispatch(`${module}/getDetail`, { id })
      }
    },
    getList () {
      const { title, parent_ids = [0] } = this.listSearchWhere || initWhere

      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: {
            title,
            parent_id: {
              $eq: parent_ids[parent_ids.length - 1]
            },
            alias: this.alias
          }
        }
      })
    },
    handleGoParent () {
      const parentIds = this.$helpers.deepCopy(this.listSearchWhere.parent_ids)

      parentIds.pop()

      this.$router.push({
        query: {
          listSearchWhere: JSON.stringify({ ...initWhere, parent_ids: parentIds })
        }
      })
    },
    handleShowPost () {
      this.cForm.id = 0
      this.cForm.modal = true
    },
    handleShowPut (detail) {
      this.cForm.id = detail.id
      this.cForm.modal = true
      this.initFields(detail)
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
    handleFormOk () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(this.cForm.id ? `${module}/put` : `${module}/post`, {
            id: this.cForm.id || '0',
            body: {
              ...this.cForm.formValidate,
              alias: this.alias,
              parent_id: this.isParent ? this.parentDetail.id : 0
            }
          })

          this.cForm.modal = false
          this.$Message.success((this.cForm.id ? '编辑' : '新增') + '成功！')
          !this.cForm.id && this.resetSearch({
            ...initWhere,
            parent_ids: this.isParent ? this.listSearchWhere.parent_ids : [0]
          })
          this.getList()
        }
      })
    }
  }
}
</script>
