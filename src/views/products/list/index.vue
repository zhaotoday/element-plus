<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <template #operations>
      <el-button type="primary" @click="reRender">刷新</el-button>
      <el-button type="primary" @click="formRef.show()">新增</el-button>
    </template>
    <template #filters>
      <el-form
        :ref="cFilters.ref"
        :model="cFilters.model"
        :rules="cFilters.rules"
        inline
      >
        <el-form-item prop="categoryId">
          <c-resource-select
            placeholder="请选择商品分类"
            :api="categoriesApi"
            v-model:value="cFilters.model.categoryId"
          />
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            clearable
            placeholder="请输入商品名称"
            v-model.trim="cFilters.model.name.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column label="商品图片" width="120">
        <template #default="{ row }">
          <c-list-image
            :src="`${$helpers.getFileUrl({ id: row.imageFileIds[0] })}`"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column label="商品分类" width="100">
        <template #default="{ row }">
          {{ row.category ? row.category.name : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="stock" label="库存" width="80" />
      <el-table-column prop="sales" label="销量" width="80" />
      <el-table-column label="操作" width="150px">
        <template #default="{ row }">
          <el-button size="small" @click="formRef.show(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(row)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <b-form ref="formRef" @ok="reRender" />
</template>

<script src="./script.js"></script>
