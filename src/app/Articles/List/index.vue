<template>
  <div>
    <Modal
      width="300"
      v-model="deleteTarget.modal"
      title="确认框"
      @on-ok="onDeleteOk">
      <p>确认删除该记录？</p>
    </Modal>
    <Breadcrumb>
      <Breadcrumb-item href="/">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章列表</Breadcrumb-item>
    </Breadcrumb>
    <List :current="current" :columns="columns" :data="articles.articles.data.items"
      :total="articles.articles.data.total"
      @on-change="onPageChange">
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary" @click="$router.push('articles/form')">新增</Button>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入标题" v-model="searchData.title" style="width: 230px;"
                @on-enter="onSearch"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary" @click="onSearch">查询</Button>
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
  import time from '@/utils/helpers/timeLite'
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
        deleteTarget: {
          modal: false,
          id: 0
        },
        searchData: {
          title: ''
        },
        current: 1,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 60
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '发布时间',
            key: 'created_at',
            width: 180,
            render (row, column, index) {
              return `<span>${time.getDateTime(row.created_at + '000')}</span>`
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 125,
            render: (row, column, index) => {
              return `<i-button type="ghost" size="small" @click="onEdit(${row.id})">编辑</i-button>
                <i-button type="ghost" size="small" @click="onDelete(${row.id})">删除</i-button>`
            }
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
      onPageChange (current) {
        this._get(current)
      },
      onSearch () {
        this._get()
        this.$set(this, 'current', 1)
      },
      onEdit (id) {
        this.$router.push(`/articles/form/${id}`)
      },
      onDelete (id) {
        this.$set(this.deleteTarget, 'modal', true)
        this.$set(this.deleteTarget, 'id', id)
      },
      onDeleteOk () {
        this.$store.dispatch('deleteArticle', {
          params: {
            id: this.deleteTarget.id
          }
        }).then(() => {
          this.$Message.success('删除成功！')
          this._get()
        })
      },
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
