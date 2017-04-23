<template>
  <div>
    <WhiteSpace :dirs="['bottom']">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
        <Breadcrumb-item>文章列表</Breadcrumb-item>
      </Breadcrumb>
    </WhiteSpace>
    <Uploader @change="handlerUploaderChange"></Uploader>
    <WhiteSpace :dirs="['bottom']">
      <WingBlank size="sm" :dirs="['right']">
        <Button type="primary">新增</Button>
      </WingBlank>
      <Poptip
        confirm
        title="确认删除这条记录？"
        placement="right"
        @on-ok="handlePoptipOk">
        <Button type="primary">删除</Button>
      </Poptip>
    </WhiteSpace>
    <List></List>
  </div>
</template>

<script>
  import List from '@/components/List'
  import WingBlank from '@/components/WingBlank'
  import WhiteSpace from '@/components/WhiteSpace'
  import Uploader from '@/components/Uploader'

  export default {
    name: 'home',
    components: {
      List,
      WingBlank,
      WhiteSpace,
      Uploader
    },
    methods: {
      handlerUploaderChange (file) {
        alert(JSON.stringify(file))
      },
      handlePoptipOk () {}
    }
  }
</script>
