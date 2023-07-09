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
        <el-form-item prop="title">
          <el-input
            clearable
            placeholder="请输入标题"
            v-model.trim="cFilters.model.title.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column label="封面" width="120">
        <template #default="{ row }">
          <c-list-image
            :src="`${$helpers.getFileUrl({ id: row.coverFileId })}`"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column label="发布时间" width="150">
        <template #default="{ row }">
          {{ $time.getTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="排序" width="120">
        <template #default="{ row }">
          <c-order-input :api="researchesApi" :row="row" @ok="reRender" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="{ row }">
          <el-button size="small" @click="formRef.show(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(row)">
            <template #reference>
              <el-button type="danger" size="small"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <b-form ref="formRef" :path="currentPath" @ok="reRender" />
</template>

<script src="./script.js"></script>
