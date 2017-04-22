<template>
  <div>
    <WhiteSpace :dirs="['bottom']">
      <Breadcrumb>
        <Breadcrumb-item href="#">首页</Breadcrumb-item>
        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
        <Breadcrumb-item>某应用</Breadcrumb-item>
      </Breadcrumb>
    </WhiteSpace>
    <WhiteSpace :dirs="['bottom']">
      <WingBlank size="sm" :dirs="['right']">
        <Button type="primary">新增</Button>
      </WingBlank>
      <Poptip
        confirm
        title="您确认删除这条内容吗？"
        placement="right"
        @on-ok="ok"
        @on-cancel="cancel">
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

  export default {
    name: 'home',
    components: {
      List,
      WingBlank,
      WhiteSpace
    }
  }
</script>
