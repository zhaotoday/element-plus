<template>
  <div>
    <slot></slot>
    <Table class="margin-bottom" border :columns="columns" :data="data" :selection="[1]"
      @on-selection-change="handleSectionChange"></Table>
    <Page :total="100" show-total show-elevator></Page>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        selection: [],
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
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 110,
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
    methods: {
      handleSectionChange (selection) {
        this.$set(this, 'selection', selection)
      }
    }
  }
</script>
