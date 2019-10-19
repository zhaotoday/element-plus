<template>
  <div class="p-students">
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
        </CListOperations>
      </CListHeader>
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
          label="姓名"
          prop="name">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.name"
                placeholder="请输入姓名" />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="手机号"
          prop="phoneNumber">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.formValidate.phoneNumber"
                placeholder="请输入手机号" />
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="性别"
          prop="gender">
          <Row>
            <Col span="20">
              <Select v-model="cForm.formValidate.gender">
                <Option
                  v-for="item in $consts.GENDERS.filter(item => item.value !== '0')"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
                  {{ item.label }}
                </Option>
              </Select>
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="生日"
          prop="birthday">
          <Row>
            <Col span="20">
              <DatePicker
                :value="cForm.formValidate.birthday"
                type="date"
                placeholder="请选择生日"
                style="width: 100%"
                @on-change="v => { handleDatePickerChange('birthday', v) }"
              />
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

const module = 'students'
const initForm = {}

export default {
  mixins: [
    routeParamsMixin,
    listMixin,
    formMixin
  ],
  data () {
    return {
      cList: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phoneNumber',
            width: 130
          },
          {
            title: '性别',
            width: 130,
            render: (h, { row }) => h('span', null, this.$helpers.getItem(this.$consts.GENDERS, 'value', row.gender)['label'] || '未知')
          },
          {
            title: '生日',
            key: 'birthday',
            width: 130
          },
          {
            title: '操作',
            key: 'action',
            width: 230,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.handleShowForm(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/students/${this.alias}/students/index/${params.row.id}/parents`)
                  }
                }
              }, '家长'),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        ]
      },
      cForm: {
        id: 0,
        modal: false,
        formValidate: this.$helpers.deepCopy(initForm),
        ruleValidate: {
          name: [
            {
              required: true,
              message: '姓名不能为空'
            }
          ],
          phoneNumber: [
            {
              required: true,
              message: '手机号不能为空'
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: '手机号格式错误'
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
    this.getList()
  },
  methods: {
    getList () {
      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: {}
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
        query: {
          where: this.listSearchWhere
        },
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
              alias: this.alias
              // natatoriumId: +this.$route.params.natatoriumId
            }
          })

          this.cForm.modal = false
          this.$Message.success((this.cForm.id ? '编辑' : '新增') + '成功！')
          !this.cForm.id && this.resetSearch()
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
