<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="#">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章列表</Breadcrumb-item>
    </Breadcrumb>
    <List :current="current" :columns="columns" :data="articles.articles.data.items"
      :total="articles.articles.data.total"
      @on-change="handlePageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="$router.push('articles/form')">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="category">
              <Select placeholder="请选择分类" style="width:180px" v-model="searchData.category_id">
                <Option value="1">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
              </Select>
            </Form-item>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入标题" v-model="searchData.title"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="handleSearch">查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import consts from '@/utils/consts'
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'

  export default {
    name: 'list',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    },
    data () {
      return {
        searchData: {
          title: '',
          category_id: ''
        },
        current: 3,
        columns: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '分类',
            key: 'category_id'
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            render () {
              return `<i-button type="text" size="small">编辑</i-button>
                <i-button type="text" size="small">删除</i-button>`
            }
          }
        ],
        data: [
          {
            id: 1,
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
          },
          {
            id: 2,
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          }
        ]
      }
    },
    computed: mapState([
      'articles'
    ]),
    created () {
      this._get()
    },
    methods: {
      handlePageChange (current) {
        this._get(current)
      },

      handleSearch () {
        this._get()
        this.$set(this, 'current', 1)
      },

      /**
       * 获取列表
       */
      _get (current = 1) {
        this.$set(this, 'current', current)

        this.$store.dispatch('getArticles', {
          params: {
            offset: (current - 1) * consts.PAGE_SIZE,
            limit: consts.PAGE_SIZE,
            ...this.searchData
          }
        })
      }
    }
  }
</script>
