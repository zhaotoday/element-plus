<template>
  <div>
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
            @click="$router.push(`/teaching/${alias}/schools/index/form`)">
            新增
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk" />
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
            <Form-item prop="status">
              <Select
                placeholder="请选择状态"
                clearable
                style="width: 190px"
                v-model="cList.cSearch.where.status.$eq">
                <Option
                  v-for="item in $consts.SCHOOL_STATUSES"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
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
import listMixin from '@/mixins/list'

const module = 'schools'
const initWhere = {
  name: {
    $like: ''
  },
  status: {
    $eq: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { SCHOOL_STATUSES } = this.$consts

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
            title: '地址',
            key: 'address',
            width: 300
          },
          {
            title: '负责人',
            key: 'leader',
            width: 100
          },
          {
            title: '手机号',
            key: 'phoneNumber',
            width: 130
          },
          {
            title: '状态',
            width: 130,
            render: (h, { row }) => h('span', null, this.$helpers.getItem(this.$consts.SCHOOL_STATUSES, 'value', row.status)['label'])
          },
          {
            title: '过期时间',
            key: 'expireTime',
            width: 150
          },
          {
            title: '操作',
            key: 'action',
            width: 320,
            render: (h, { row }) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/teaching/${this.alias}/schools/index/form/${row.id}`)
                  }
                }
              }, '编辑'),
              h('CDropdown', {
                attrs: {
                  title: '审核',
                  options: SCHOOL_STATUSES.filter(item => item.value !== 'CHECKING')
                },
                on: {
                  click: async value => {
                    this.handleCheck(row.id, value)
                  }
                }
              }),
              h('CDropdown', {
                attrs: {
                  title: '链接',
                  options: [
                    {
                      value: 'TEACHER',
                      label: '教师端'
                    },
                    {
                      value: 'PARENT',
                      label: '家长端'
                    },
                    {
                      value: 'MANAGER',
                      label: '后台'
                    }
                  ]
                },
                on: {
                  click: async value => {
                    this.handleClickLink(row, value)
                  }
                }
              }),
              h('CDel', {
                on: {
                  ok: () => {
                    this.handleDelOk(row.id)
                  }
                }
              }, '删除')
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
          where: this.listSearchWhere
        }
      })
    },
    async handleDelOk (id) {
      await this.$store.dispatch(`${module}/del`, { id })
      this.$Message.success('删除成功！')

      const getListRes = await this.getList()
      !getListRes.items.length && this.goPrevPage()
    },
    async handleCheck (id, value) {
      await this.$store.dispatch(`${module}/put`, {
        id,
        body: { status: value }
      })

      if (value === 'PASSED') {
        this.$Message.success('通过成功')
      } else {
        this.$Message.success('拒绝成功')
      }

      this.getList()
    },
    handleClickLink (row, value) {
      switch (value) {
        case 'TEACHER':
          window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4cdb90b85ca4429c&redirect_uri=${encodeURIComponent('http://sign-in.tongnianjihua.com/get-weixin-code.html?appid=wx4cdb90b85ca4429c&redirect_uri=https://sign-in-teacher.tongnianjihua.com/?schoolId=' + row.id + '&response_type=code&scope=snsapi_userinfo&state=ABCDEFG#wechat_redirect')}&response_type=code&scope=snsapi_userinfo&state=ABCDEFG#wechat_redirect`)
          break
        case 'PARENT':
          window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4cdb90b85ca4429c&redirect_uri=${encodeURIComponent('http://sign-in.tongnianjihua.com/get-weixin-code.html?appid=wx4cdb90b85ca4429c&redirect_uri=https://sign-in-parent.tongnianjihua.com/?schoolId=' + row.id + '&response_type=code&scope=snsapi_userinfo&state=ABCDEFG#wechat_redirect')}&response_type=code&scope=snsapi_userinfo&state=ABCDEFG#wechat_redirect`)
          break
        case 'MANAGER':
          const user = JSON.stringify({
            'id': row.id,
            'username': row.name,
            'phoneNumber': row.phoneNumber,
            'role': 'SCHOOL_MANAGER'
          })
          window.open(`https://sign-in-school-admin.tongnianjihua.com/?user=${user}&token=${this.$auth.get()['token']}`)
          break
        default:
          break
      }
    }
  }
}
</script>
