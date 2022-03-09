<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <el-descriptions v-if="cDialog.visible" :column="1">
      <el-descriptions-item label="Username" width="100">
        {{ detail.no }}
      </el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script src="./script.js"></script>
