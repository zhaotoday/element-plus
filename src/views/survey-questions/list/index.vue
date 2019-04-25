<template>
  <div>
    <CList
      :columns="cList.columns"
      :data="list.items"
      :total="list.total"
      :pageCurrent="listPageCurrent"
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
          <Button @click="$router.push(`/${alias}/surveys/subjects`)">返回</Button>
        </CListOperations>
      </CListHeader>
    </CList>
    <Modal
      width="496"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'">
      <div style="width: 480px; min-height: 190px; max-height: 400px; overflow-x: hidden; overflow-y: auto;">
        <div style="width: 465px; min-height: 190px; overflow: hidden;">
          <Form
            ref="formValidate"
            :model="cForm.formValidate"
            :rules="cForm.ruleValidate"
            :label-width="80">
            <Form-item
              label="题目"
              prop="title">
              <Row>
                <Col span="20">
                  <Input
                    v-model="cForm.formValidate.title"
                    placeholder="请输入题目" />
                </Col>
              </Row>
            </Form-item>
            <Form-item
              label="类型"
              prop="type">
              <Row>
                <Col span="20">
                  <Select
                    v-model="cForm.formValidate.type"
                    placeholder="请选择类型"
                    style="width: 320px;">
                    <Option
                      v-for="item in $consts.SURVEY_QUESTION_TYPES"
                      :key="item.value"
                      :value="item.value">
                      {{ item.label }}
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Form-item>
            <Form-item
              v-show="cForm.formValidate.type === 'CHECKBOX'"
              label="选项"
              prop="value">
              <Row>
                <Col span="20">
                  <div
                    v-for="(item, index) in cForm.formValidate.value"
                    :key="index"
                    style="padding-bottom: 10px;">
                    <Input
                      v-model="item.label"
                      placeholder="请输入题目">
                    <Button
                      slot="append"
                      icon="md-close"
                      @click="handleDelOption(index)" />
                    </Input>
                  </div>
                  <Button
                    icon="md-add"
                    @click="handleAddOption">
                  </Button>
                </Col>
              </Row>
            </Form-item>
          </Form>
        </div>
      </div>
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

const module = 'surveyQuestions'
const initForm = {
  title: '',
  value: []
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    const { ORDER_ACTIONS } = this.$consts

    return {
      cList: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '题目',
            key: 'title'
          },
          {
            title: '操作',
            key: 'action',
            width: 245,
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
        ]
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: this.$helpers.deepCopy(initForm),
        ruleValidate: {
          title: [
            {
              required: true,
              message: '题目不能为空'
            }
          ],
          type: [
            {
              required: true,
              message: '类型不能为空'
            }
          ]
        }
      }
    }
  },
  computed: mapState({
    list: state => state[module].list
  }),
  watch: {
    'cForm.modal': {
      handler (newVal) {
        !newVal && this.resetFields(initForm)
      }
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.getList()
    next()
  },
  async created () {
    this.$store.dispatch(`${module}/resetList`)
    this.getList()
  },
  methods: {
    getList () {
      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: {
            subjectId: this.$route.params.id,
            alias: this.alias
          }
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
      await this.$store.dispatch(`${module}/postAction`, {
        query: { where: { ...this.listSearchWhere, alias: this.alias } },
        body: { type: value, id }
      })

      this.getList()
    },
    handleFormOk () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(this.cForm.id ? `${module}/put` : `${module}/post`, {
            id: this.cForm.id,
            body: {
              ...this.cForm.formValidate,
              subjectId: this.$route.params.id,
              alias: this.alias
            }
          })

          this.cForm.modal = false
          this.$Message.success((this.cForm.id ? '编辑' : '新增') + '成功！')
          !this.cForm.id && this.resetSearch()
          this.getList()
        }
      })
    },
    handleDelOption (index) {
      this.cForm.formValidate.value.splice(index, 1)
    },
    handleAddOption () {
      this.cForm.formValidate.value.push({
        value: '',
        label: ''
      })
    }
  }
}
</script>
