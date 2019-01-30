<template>
  <div>
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
            <Form-item prop="nickName">
              <Input
                type="text"
                placeholder="请输入标题"
                v-model="cList.cSearch.where.nickName.$like"
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
    </CList>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routeParamsMixin from '@/mixins/route-params'
import listMixin from '@/mixins/list'

const module = 'wxUsers'
const initWhere = {
  nickName: {
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
            title: '昵称',
            key: 'nickName'
          },
          {
            title: '头像',
            key: 'avatarUrl',
            width: 76,
            render: (h, params) => h('Avatar', {
              props: {
                src: params.row.avatarUrl,
                shape: 'square',
                size: 'large'
              }
            })
          },
          {
            title: '性别',
            key: 'gender',
            width: 65,
            render: (h, params) => h('span', null, this.$consts.GENDERS[params.row.gender])
          },
          {
            title: 'Open Id',
            key: 'openId',
            width: 250
          },
          {
            title: 'Union Id',
            key: 'unionId',
            width: 250
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
      console.log(this.listSearchWhere, 33)
      return this.$store.dispatch(`${module}/getList`, {
        query: {
          offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
          limit: this.$consts.PAGE_SIZE,
          where: this.listSearchWhere
        }
      })
    }
  }
}
</script>
