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
                style="width:200px"
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
                style="width: 200px;" />
            </Form-item>
            <Form-item prop="telephone">
              <Input
                type="text"
                placeholder="请输入手机号"
                v-model="cList.cSearch.where.telephone.$like"
                style="width: 200px;" />
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

const module = 'wxUsers'
const initWhere = {
  status: {
    $eq: ''
  },
  nickName: {
    $like: ''
  },
  telephone: {
    $like: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
  ],
  data () {
    const { LIST_COLUMN_WIDTHS, WX_USER_STATUSES, GENDERS } = this.$consts

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
            key: 'telephone',
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
            title: '状态',
            key: 'status',
            width: 100,
            render: (h, params) => h('span', null, this.$helpers.getOption(WX_USER_STATUSES, params.row.status)['label'])
          },
          {
            title: '操作',
            key: 'action',
            width: 140,
            render: (h, params) => h('div', [
              h('CDropdown', {
                attrs: {
                  width: 90,
                  title: '修改状态',
                  options: WX_USER_STATUSES
                },
                on: {
                  click: async value => {
                    this.handleChangeStatus(params.row.id, value)
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
    }
  }
}
</script>

<style
  lang="scss"
  src="./styles/index.scss">
</style>
