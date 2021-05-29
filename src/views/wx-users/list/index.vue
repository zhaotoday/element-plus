<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <el-table :data="list.items" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column label="头像" width="100">
        <template #default="{ row }">
          <c-list-image :src="row.avatarUrl" height="50px" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="province" label="省份" width="200" />
      <el-table-column prop="city" label="城市" width="200" />
      <el-table-column
        prop="answeredQuestionsCount"
        label="猜中灯谜数"
        width="100px"
      />
      <el-table-column label="奖项" width="100px">
        <template #default="{ row }">
          {{ getPrize(row.answeredQuestionsCount) }}
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <i-form ref="form" @render-list="reRender" />
</template>

<script src="./script.js"></script>
