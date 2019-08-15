<template>
  <div class="p-wx-user">
    <CList
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :pageCurrent="listPageCurrent"
      :searchWhere="listSearchWhere">
      <CListHeader>
        <CListSearch>
          <Form
            inline
            @submit.native.prevent="search">
            <Form-item prop="status">
              <Select
                placeholder="请选择状态"
                clearable
                style="width: 190px"
                v-model="cList.cSearch.where.status.$eq">
                <Option
                  v-for="item in $consts.WX_USER_STATUSES"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="nickName">
              <Input
                type="text"
                placeholder="请输入昵称"
                v-model="cList.cSearch.where.nickName.$like"
                style="width: 190px;" />
            </Form-item>
            <Form-item prop="phoneNumber">
              <Input
                type="text"
                placeholder="请输入手机号"
                v-model="cList.cSearch.where.phoneNumber.$like"
                style="width: 190px;" />
            </Form-item>
            <Form-item>
              <Button
                type="primary"
                @click="search">
                查询
              </Button>
            </Form-item>
            <FormItem>
              <Button
                type="primary"
                @click="exportXLSX">
                导出
              </Button>
            </FormItem>
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
import xlsx from '@/utils/xlsx'
import WxUsersModel from '@/models/admin/wx-users'

const module = 'wxUsers'
const initWhere = {
  status: {
    $eq: ''
  },
  nickName: {
    $like: ''
  },
  phoneNumber: {
    $like: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS, GENDERS } = this.$consts

    return {
      cList: {
        columns: [
          {
            title: '图片',
            key: 'picture',
            width: 120,
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: params.row.avatarUrl,
                  class: 'pb-picture'
                }
              })
            }
          },
          {
            title: '昵称',
            key: 'nickName',
            minWidth: LIST_COLUMN_WIDTHS.USER
          },
          {
            title: '手机号',
            key: 'phoneNumber',
            width: 150
          },
          {
            title: '性别',
            key: 'gender',
            width: 65,
            render: (h, params) => h('span', null, GENDERS[params.row.gender])
          },
          {
            title: '国家',
            key: 'country',
            width: 100
          },
          {
            title: '省份',
            key: 'province',
            width: 100
          },
          {
            title: '城市',
            key: 'city',
            width: 100
          },
          {
            title: '操作',
            key: 'action',
            width: 130,
            render: (h, params) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(
                      this.$helpers.getOrderRoute({
                        alias: 'wxUsers',
                        wxUserId: params.row.id
                      })
                    )
                  }
                }
              }, '查看订单')
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
          where: this.listSearchWhere
        }
      })
    },
    async handleChangeStatus (id, value) {
      await this.$store.dispatch(`${module}/put`, {
        id,
        body: { status: value }
      })

      this.$Message.success('修改状态成功')
      this.getList()
    },
    async getExportWxUsersListItems () {
      this.search()

      const { data: { items } } = await new WxUsersModel().GET({
        query: {
          where: this.listSearchWhere,
          offset: 0,
          limit: 10000
        }
      })

      return items
    },
    async exportXLSX () {
      const items = await this.getExportWxUsersListItems()

      xlsx.download({
        fileName: `微信用户（${this.$time.getDate()}）`,
        data: (() => {
          const columns = this.cList.columns
          const columnKeys = this.cList.columns.map(item => item.key)

          return items.map(item => {
            let ret = {}

            Object.keys(item).forEach(key => {
              const index = columnKeys.findIndex(columnKey => columnKey === key)

              if (index !== -1) {
                switch (key) {
                  case 'gender':
                    ret[columns[index].title] = this.$consts.GENDERS[item[key]] || '未知'
                    break
                  default:
                    ret[columns[index].title] = item[key]
                    break
                }
              }
            })

            return ret
          })
        })()
      })
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
