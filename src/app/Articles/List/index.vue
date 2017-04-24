<template>
  <div>
    <Breadcrumb>
      <Breadcrumb-item href="#">首页</Breadcrumb-item>
      <Breadcrumb-item href="#">文章管理</Breadcrumb-item>
      <Breadcrumb-item>文章列表</Breadcrumb-item>
    </Breadcrumb>
    <List>
      <ListHeader>
        <ListOperations>
          <Button class="margin-right-sm" type="primary">新增</Button>
          <Poptip
            confirm
            title="确认删除选中记录？"
            placement="right"
            @on-ok="handlePoptipOk">
            <Button type="primary">删除</Button>
          </Poptip>
        </ListOperations>
        <ListSearch>
          <Form ref="formInline" inline>
            <Form-item prop="category">
              <Select placeholder="请选择分类" style="width:180px">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
              </Select>
            </Form-item>
            <Form-item prop="title">
              <Input type="text" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item>
              <Button type="primary">查询</Button>
            </Form-item>
          </Form>
        </ListSearch>
      </ListHeader>
    </List>
  </div>
</template>

<script>
  import List, { ListHeader, ListOperations, ListSearch } from '@/components/List'

  export default {
    name: 'article-list',
    components: {
      List,
      ListHeader,
      ListOperations,
      ListSearch
    }
  }
</script>
