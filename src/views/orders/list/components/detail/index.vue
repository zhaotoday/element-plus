<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <el-descriptions v-if="cDialog.visible" :column="1">
      <el-descriptions-item label="订单号" :width="200">
        {{ detail.no }}
      </el-descriptions-item>
      <el-descriptions-item label="用户" width="100px">
        {{ detail.user.name }}
      </el-descriptions-item>
      <el-descriptions-item label="下单时间" width="100px">
        {{ $time.getTime(detail.createdAt) }}
      </el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script src="./script.js"></script>
