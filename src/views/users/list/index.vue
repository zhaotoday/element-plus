<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <template #operations>
      <el-button type="primary" @click="reRender">刷新</el-button>
    </template>
    <template #filters>
      <el-form
        :ref="cFilters.ref"
        :model="cFilters.model"
        :rules="cFilters.rules"
        inline
      >
        <el-form-item prop="name">
          <el-input
            clearable
            placeholder="请输入商品分类名称"
            v-model.trim="cFilters.model.name.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column prop="name" label="商品分类名称" />
      <el-table-column label="商品分类图标" width="120">
        <template #default="{ row }">
          <c-list-image
            :src="`${$helpers.getFileUrl({ id: row.iconFileId })}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="排序" width="120">
        <template #default="{ row }">
          <c-order-input :api="usersApi" :row="row" @ok="reRender" />
        </template>
      </el-table-column>
    </el-table>
  </c-list>
</template>

<script src="./script.js"></script>
