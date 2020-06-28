<template>
  <div class="p-ads">
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
          label="类型"
          prop="type">
          <Row>
            <Col span="20">
              <Select
                v-model="cForm.formValidate.type"
                style="width: 320px;">
                <Option
                  v-for="item in $consts.COUPON_ACTIVITY_TYPES"
                  :key="item.value"
                  :value="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </Col>
          </Row>
        </Form-item>
        <Form-item
          v-if="cForm.formValidate.type === 'NEW_USER'"
          label="发放时机"
          prop="sendTime">
          <Row>
            <Col span="20">
              <Select
                v-model="cForm.formValidate.sendTime"
                style="width: 320px;">
                <Option
                  v-for="item in $consts.COUPON_SEND_TIMES"
                  :key="item.value"
                  :value="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </Col>
          </Row>
        </Form-item>
        <Form-item
          label="优惠券"
          prop="coupons">
          <Row>
            <Col span="20">
              <CCouponSelect
                :selected-item="cForm.coupon"
                :selected-items="cForm.formValidate.coupons"
                @change="handleCouponChange"
              />
              <div
                v-for="item in cForm.formValidate.coupons"
                :key="item.id"
                style="position: relative; width: 327px; padding-top: 5px;">
                <span style="display: inline-block; width: 160px;">
                  {{item.name}}
                </span>
                数量：
                <InputNumber
                  :key="item.id"
                  :min="0"
                  :max="100"
                  :value="item.number"
                  @on-change="number => { handleCouponNumberChange(item.id, number) }" />
                <Button
                  type="text"
                  icon="md-close"
                  style="position: absolute; top: 5px; right: 0;"
                  @click="delCoupon(item.id)">
                </Button>
              </div>
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

const module = 'couponActivities'
const initForm = {
  status: 1,
  type: '',
  coupons: []
}

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
            title: '名称',
            key: 'name'
          },
          {
            type: 'type',
            title: '类型',
            width: 90,
            render: (h, params) => h('span', null, this.$helpers.getItem(this.$consts.COUPON_ACTIVITY_TYPES, 'value', params.row.type)['label'])
          },
          {
            title: '优惠券',
            key: 'coupons',
            render: (h, params) => {
              const coupons = params.row.coupons.map(item => h('p', null, `${item.name} x ${item.number}`))
              return h('span', null, coupons)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 240,
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
                  options: this.$consts.ORDER_ACTIONS
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
        coupon: {
          id: 0
        },
        ruleValidate: {
          name: [
            {
              required: true,
              message: '名称不能为空'
            }
          ],
          type: [
            {
              required: true,
              message: '类型不能为空'
            }
          ],
          link: [
            {
              required: true,
              message: '链接不能为空'
            }
          ],
          picture: [
            {
              required: true,
              message: '图片不能为空'
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
          where: { alias: this.alias }
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
    async handleChangeStatus (id, value) {
      await this.$store.dispatch(`${module}/put`, {
        id,
        body: { status: value }
      })

      this.$Message.success('修改状态成功')
      this.getList()
    },
    async handleSort (id, value) {
      await this.$store.dispatch(`${module}/postAction`, {
        query: { where: { ...this.listSearchWhere, alias: this.alias } },
        body: { type: value, id }
      })

      this.getList()
    },
    handleCouponChange (item) {
      setTimeout(() => {
        this.cForm.coupon = { id: 0 }
      }, 100)

      if (item.id) {
        this.cForm.formValidate.coupons.push(item)
      }
    },
    handleCouponNumberChange (id, number) {
      if (!number) {
        this.delCoupon(id)
      } else {
        this.cForm.formValidate.coupons.find(item => item.id === id)['number'] = number
      }
    },
    delCoupon (id) {
      const index = this.cForm.formValidate.coupons.findIndex(item => item.id === id)
      this.cForm.formValidate.coupons.splice(index, 1)
    },
    handleFormOk () {
      this.$refs.formValidate.validate(async valid => {
        if (valid) {
          await this.$store.dispatch(this.cForm.id ? `${module}/put` : `${module}/post`, {
            id: this.cForm.id,
            body: {
              ...this.cForm.formValidate,
              alias: this.alias
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
