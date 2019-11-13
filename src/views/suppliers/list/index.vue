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
            @click="$router.push(`/${alias}/suppliers/index/form`)">
            新增
          </Button>
          <CBatchDel
            :selected-items="listSelectedItems"
            @ok="handleDelOk"
          />
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
    </CList>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'

const module = 'suppliers'
const initWhere = {
  name: {
    $like: ''
  }
}

export default {
  mixins: [
    routeParamsMixin,
    listMixin
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
            title: '产地',
            key: 'productPlace',
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
            title: '操作',
            key: 'action',
            width: 170,
            render: (h, { row }) => h('div', [
              h('Button', {
                on: {
                  click: () => {
                    this.$router.push(`/${this.alias}/suppliers/index/form/${row.id}`)
                  }
                }
              }, '编辑'),
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
    }
  }
}
</script>
