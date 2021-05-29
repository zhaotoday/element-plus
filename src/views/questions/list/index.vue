<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <el-table :data="list.items" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="谜面" />
      <el-table-column prop="answer" label="谜底" width="200" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <span v-if="row.answered" class="csuccess">
            已猜中
          </span>
          <span v-else class="cdanger">
            未猜中
          </span>
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <i-form ref="form" @render-list="reRender" />
</template>

<script src="./script.js"></script>
